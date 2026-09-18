import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const poolMax = Number(process.env.DB_POOL_MAX ?? 10);
if (!Number.isInteger(poolMax) || poolMax <= 0 || poolMax > 100) {
  throw new Error("DB_POOL_MAX must be an integer between 1 and 100");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: poolMax,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false" }
      : undefined,
});
export const db = drizzle(pool, { schema });

export async function runMigrations(migrationsFolder: string) {
  await migrate(db, { migrationsFolder });
}

export * from "./schema";
