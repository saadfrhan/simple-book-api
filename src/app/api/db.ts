import { Generated, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Book, Order, User } from "./types";

interface ID {
  id: Generated<number>;
}

interface Database {
  books: Book & ID;
  orders: Order & ID;
  users: User & ID;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      ssl: true,
      connectionString: process.env.NEXT_PUBLIC_NEON_DATABASE_URI!
    })
  })
})