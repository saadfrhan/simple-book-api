import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";
import { Params } from "../../types";

export async function GET(
  _: NextRequest,
  { params }: Params
) {

  const result = await db
    .selectFrom('books')
    .selectAll()
    .where('id', '=', params.id)
    .execute();

  return NextResponse.json({ result });
}