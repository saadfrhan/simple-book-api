import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";
import { Params } from "../../types";

export async function GET(
  _: NextResponse,
  { params }: Params
) {
  const result = await db
    .selectFrom('orders')
    .selectAll()
    .where('id', '=', params.id)
    .execute();

  return new NextResponse(JSON.stringify(result));
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { customer_name }: { customer_name: string } = await request.json();

  const { id } = await db
    .updateTable('orders')
    .set({
      customer_name
    })
    .where('id', '=', params.id)
    .returning('id')
    .executeTakeFirstOrThrow()

  return NextResponse.json({
    updated: true,
    order_id: id
  })
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { id } = await db
    .deleteFrom('orders')
    .where('id', '=', params.id)
    .returning('id')
    .executeTakeFirstOrThrow();

  return NextResponse.json({
    deleted: true,
    order_id: id
  })
}