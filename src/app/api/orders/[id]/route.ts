import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { db, pool } from "../../db";
import { Params } from "../../types";

export async function GET(
  _: NextRequest,
  event: NextFetchEvent,
  { params }: Params
) {
  const result = await db
    .selectFrom('orders')
    .selectAll()
    .where('id', '=', params.id)
    .execute();

  event.waitUntil(pool.end());

  return new NextResponse(JSON.stringify(result));
}

export async function PATCH(
  request: NextRequest,
  event: NextFetchEvent,
  { params }: Params) {
  const { customer_name }: { customer_name: string } = await request.json();

  const { id } = await db
    .updateTable('orders')
    .set({
      customer_name
    })
    .where('id', '=', params.id)
    .returning('id')
    .executeTakeFirstOrThrow();

  event.waitUntil(pool.end());

  return NextResponse.json({
    updated: true,
    order_id: id
  })
}

export async function DELETE(
  _: NextRequest,
  event: NextFetchEvent,
  { params }: Params
) {
  const { id } = await db
    .deleteFrom('orders')
    .where('id', '=', params.id)
    .returning('id')
    .executeTakeFirstOrThrow();

  event.waitUntil(pool.end());

  return NextResponse.json({
    deleted: true,
    order_id: id
  })
}