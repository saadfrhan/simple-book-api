import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "@neondatabase/serverless";
import { DB } from 'kysely-codegen';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({ pool })
})