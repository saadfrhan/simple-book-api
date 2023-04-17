import { NextRequest, NextResponse } from "next/server";
import sql from "../db";
import { Book } from "../types";

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams

  const type = searchParams.get('type');
  const limit = searchParams.get('limit');

  if (type && !limit) {
    const result = await sql<Book[]>`
      SELECT
        "id",
        "name",
        "type",
        "available"
      FROM
        "books"
      WHERE
        "type" = ${type}
    `
    return NextResponse.json({ result })
  }

  if (limit && !type) {
    const result = await sql<Book[]>`
      SELECT
        "id",
        "name",
        "type",
        "available"
      FROM
        "books"
      LIMIT
        ${limit}
    `
    return NextResponse.json({ result })
  }

  if (limit && type) {
    const result = await sql<Book[]>`
      SELECT
        "id",
        "name",
        "type",
        "available"
      FROM
        "books"
      WHERE
        "type" = ${type}
      LIMIT
        ${limit}
    `
    return NextResponse.json({ result })
  }

  const result = await sql<Book[]>`
      SELECT
        "id",
        "name",
        "type",
        "available"
      FROM
        "books"
    `

  return NextResponse.json({ result });
}