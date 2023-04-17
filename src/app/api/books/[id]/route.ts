import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { db, pool } from "../../db";
import { Params } from "../../types";

export async function GET(
  _: NextRequest,
  event: NextFetchEvent,
  { params }: Params
) {

  const result = await db
    .selectFrom('books')
    .selectAll()
    .where('id', '=', params.id)
    .execute();

  event.waitUntil(pool.end());

  return NextResponse.json({ result });
}