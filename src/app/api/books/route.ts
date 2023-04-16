import { NextResponse } from "next/server";
import { db } from "../db";

export async function GET() {
  const result = await db
    .selectFrom('books')
    .select(
      ['id', 'name', 'type', 'available']
    )
    .execute();
  console.log("backend result", result);
  return new NextResponse(JSON.stringify(result));
}