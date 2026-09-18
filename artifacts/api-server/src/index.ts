import app from "./app";
import { logger } from "./lib/logger";
import { pool, runMigrations } from "@workspace/db";
import { validateRuntimeConfig } from "./config";
import path from "node:path";

validateRuntimeConfig();

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

if (process.env.RUN_MIGRATIONS === "true") {
  const migrationsFolder =
    process.env.DB_MIGRATIONS_DIR ?? path.resolve("lib/db/drizzle");
  await runMigrations(migrationsFolder);
  logger.info("Database migrations applied");
}

const server = app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});

let shuttingDown = false;
async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, "Shutting down");

  const forceExit = setTimeout(() => process.exit(1), 10_000).unref();
  server.close(async () => {
    try {
      await pool.end();
      clearTimeout(forceExit);
      process.exit(0);
    } catch (error) {
      logger.error({ err: error }, "Shutdown failed");
      process.exit(1);
    }
  });
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
