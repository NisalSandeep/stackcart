import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DB_URL) {
  throw new Error("DB_url is not the .env file ");
}

// intialize PostgreSQL connection pool
const pool = new Pool({ connectionString: ENV.DB_URL, max: 12 });

pool.on("connect", () => {
  console.log("connected successfully");
});

pool.on("error", (err) => {
  console.error("DB connection error: ", err);
});

export const db = drizzle({ client: pool, schema });
