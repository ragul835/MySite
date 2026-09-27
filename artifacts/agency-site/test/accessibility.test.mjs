import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("core accessibility affordances remain present", async () => {
  const [html, app, contact, styles] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/contact.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/index.css", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<html lang="en">/);
  assert.match(app, /role="status"/);
  assert.match(app, /useReducedMotion/);
  assert.match(contact, /aria-invalid=/);
  assert.match(contact, /aria-describedby=/);
  assert.match(contact, /role="alert"/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});
