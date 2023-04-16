import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";
import { OrderRequest } from "../types";

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return NextResponse.json({
      error: 'Authentication token required!'
    })
  }

  const result = await db
    .selectFrom('orders')
    .selectAll()
    .where('created_by', '=', accessToken)
    .execute();

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return NextResponse.json({
      error: 'Authentication token required!'
    })
  }

  const { book_id, customer_name }: OrderRequest = await request.json()

  if (isNaN(Number(book_id)) || customer_name.trim() === '') {
    return NextResponse.json({
      error: "Please check the 'book_id' and 'customer_name'"
    })
  }

  const { id, book_id: bookId } = await db.
    insertInto('orders')
    .values({
      book_id,
      customer_name,
      created_by: accessToken,
      quantity: 1,
      timestamp: new Date()
    })
    .returning(['id', 'book_id'])
    .executeTakeFirstOrThrow()

  await db
    .updateTable('books')
    .set(({ bxp }) => ({
      current_stock: bxp('current_stock', '-', 1)
    }))
    .where('id', '=', bookId)
    .execute()

  return NextResponse.json({
    created: true,
    orderId: id
  })
}