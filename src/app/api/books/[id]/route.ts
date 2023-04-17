import { NextRequest, NextResponse } from "next/server";
import { Book, Params } from "../../types";
import sql from "../../db";

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const result = await sql<Book[]>`
      SELECT * FROM "books"
      WHERE "id" = ${params.id}
    `;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error : error
    })
  }

}