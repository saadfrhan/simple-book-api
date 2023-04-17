import postgres from "postgres";

const sql = postgres({
  user: process.env.PGUSER,
  pass: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  ssl: "allow",
});

export default sql;