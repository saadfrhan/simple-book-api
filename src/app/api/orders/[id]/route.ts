import { NextRequest, NextResponse } from "next/server";
import sql from "../../db";
import { Order, Params } from "../../types";

export async function GET(request: NextRequest, { params }: Params) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return NextResponse.json({
      error: 'Authentication token required!'
    })
  }

  try {
    const result = await sql<Order[]>`
      SELECT * FROM "orders"
      WHERE "id" = ${params.id} AND "created_by" = ${accessToken} 
    `;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({
      message: `Either the order doesn't exist or you are not the owner of it.`,
      error: error instanceof Error ? error : error
    })
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { customer_name }: { customer_name: string } = await request.json();

  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return NextResponse.json({
      error: 'Authentication token required!'
    })
  }

  try {
    const confirm = await sql<{ id: number }[]>`
      UPDATE "orders"
      SET "customer_name" = ${customer_name}
      WHERE "id" = ${params.id} AND "created_by" = ${accessToken}
      RETURNING "id"
    `
    return NextResponse.json({
      updated: true,
      order_id: confirm[0].id
    })
  } catch (error) {
    return NextResponse.json({
      message: `Either the order doesn't exist or you are not the owner of it.`,
      error: error instanceof Error ? error : error
    })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return NextResponse.json({
      message: 'Authentication token required!'
    })
  }

  try {
    const confirm = await sql<{ id: number }[]>`
      DELETE FROM "orders"
      WHERE "id" = ${params.id} AND "created_by" = ${accessToken}
      RETURNING "id"
    `;
    return NextResponse.json({
      deleted: true,
      order_id: confirm[0].id || null
    })
  } catch (error) {
    return NextResponse.json({
      message: `Either the order doesn't exist or you are not the owner of it.`,
      error: error instanceof Error ? error : error
    })
  }
}