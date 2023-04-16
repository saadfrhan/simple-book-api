import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";
import { BookFilterOptions } from "../types";

export async function GET(
  request: NextRequest
) {

  const searchParams = request.nextUrl.searchParams

  const type = searchParams.get('type');
  const limit = searchParams.get('limit');

  if (type && !limit) {
    const result = await db
      .selectFrom('books')
      .select(
        ['id', 'name', 'type', 'available']
      ).where('type', '=', type)
      .execute()
    return NextResponse.json({ result });
  }

  if (limit && !type) {
    const result = await db
      .selectFrom('books')
      .select(
        ['id', 'name', 'type', 'available']
      ).limit(Number(limit))
      .execute()
    return NextResponse.json({ result })
  }

  if (limit && type) {
    const result = await db
      .selectFrom('books')
      .select(
        ['id', 'name', 'type', 'available']
      )
      .where('type', '=', type)
      .limit(Number(limit))
      .execute()
    return NextResponse.json({ result })
  }

  const result = await db
    .selectFrom('books')
    .select(
      ['id', 'name', 'type', 'available']
    )
    .execute();

  return NextResponse.json({ result });
}