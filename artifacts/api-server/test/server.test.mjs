import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

async function availablePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

async function waitUntilReady(baseUrl, child) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`API server exited during startup with ${child.exitCode}`);
    }
    try {
      const response = await fetch(`${baseUrl}/api/healthz`);
      if (response.ok) return;
    } catch {
      // The process may still be binding the socket.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("API server did not become ready in time");
}

test("production API contract and safety middleware", async (t) => {
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const staticDir = await mkdtemp(path.join(tmpdir(), "waygrow-api-test-"));
  await mkdir(path.join(staticDir, "assets"));
  await writeFile(path.join(staticDir, "index.html"), "<!doctype html><title>Test SPA</title>");
  await writeFile(path.join(staticDir, "robots.txt"), "User-agent: *\nAllow: /\n");
  await writeFile(path.join(staticDir, "assets", "app-abc123.js"), "export default true;");
  const child = spawn(process.execPath, ["--enable-source-maps", "dist/index.mjs"], {
    cwd: new URL("..", import.meta.url),
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(port),
      DATABASE_URL: "postgresql://test:test@127.0.0.1:1/test?connect_timeout=1",
      FRONTEND_URL: "https://www.example.com",
      TRUST_PROXY_HOPS: "0",
      RUN_MIGRATIONS: "false",
      STATIC_DIR: staticDir,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let diagnostics = "";
  child.stdout.on("data", (chunk) => (diagnostics += chunk));
  child.stderr.on("data", (chunk) => (diagnostics += chunk));

  try {
    await waitUntilReady(baseUrl, child);

    await t.test("liveness includes hardened headers", async () => {
      const response = await fetch(`${baseUrl}/api/healthz`, {
        headers: { Origin: "https://www.example.com" },
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("access-control-allow-origin"), "https://www.example.com");
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.equal(response.headers.get("x-powered-by"), null);
      assert.match(
        response.headers.get("content-security-policy") ?? "",
        /style-src[^;]*https:\/\/fonts\.googleapis\.com/,
      );
    });

    await t.test("unapproved origins receive no CORS grant", async () => {
      const response = await fetch(`${baseUrl}/api/healthz`, {
        headers: { Origin: "https://attacker.example" },
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("access-control-allow-origin"), null);
    });

    await t.test("invalid contact input is rejected before database access", async () => {
      const response = await fetch(`${baseUrl}/api/v1/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: "not-an-email" }),
      });
      assert.equal(response.status, 400);
    });

    await t.test("honeypot submissions are discarded", async () => {
      const response = await fetch(`${baseUrl}/api/v1/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Automated User",
          email: "bot@example.com",
          phone: "1234567890",
          service: "Web Development",
          message: "This submission should never reach the database.",
          website: "https://spam.example",
        }),
      });
      assert.equal(response.status, 202);
    });

    await t.test("oversized request bodies are rejected", async () => {
      const response = await fetch(`${baseUrl}/api/v1/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "x".repeat(40_000) }),
      });
      assert.equal(response.status, 413);
    });

    await t.test("readiness fails when the database is unavailable", async () => {
      const response = await fetch(`${baseUrl}/api/readyz`);
      assert.equal(response.status, 503);
    });

    await t.test("SPA navigation is not cached across deployments", async () => {
      const response = await fetch(`${baseUrl}/services`, {
        headers: { Accept: "text/html" },
      });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("cache-control"), "no-cache");
      assert.match(await response.text(), /Test SPA/);
    });

    await t.test("only fingerprinted build assets are immutable", async () => {
      const asset = await fetch(`${baseUrl}/assets/app-abc123.js`);
      assert.match(asset.headers.get("cache-control") ?? "", /max-age=31536000/);
      assert.match(asset.headers.get("cache-control") ?? "", /immutable/);

      const publicFile = await fetch(`${baseUrl}/robots.txt`);
      assert.match(publicFile.headers.get("cache-control") ?? "", /max-age=3600/);
      assert.doesNotMatch(publicFile.headers.get("cache-control") ?? "", /immutable/);
    });
  } finally {
    child.kill("SIGTERM");
    await new Promise((resolve) => child.once("exit", resolve));
    await rm(staticDir, { recursive: true, force: true });
  }

  assert.equal(child.exitCode, 0, diagnostics);
});
