import { NextRequest, NextResponse } from "next/server";
import sql from "../db";
import { Order, OrderRequest } from "../types";

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get('Authorization');

  if (!accessToken) {
    return NextResponse.json({
      error: 'Authentication token required!'
    })
  }

  try {
    const result = await sql<Order[]>`
      SELECT * FROM "orders"
      WHERE "created_by" = ${accessToken}
    `
    return NextResponse.json(result)

  } catch (error) {
    return NextResponse.json({
      message: 'Either you had passed incorrect accessToken or there is some error.',
      error: error instanceof Error ? error : error
    })
  }
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

  try {
    const [{ id }] = await sql<{ id: number }[]>`
      INSERT INTO
      "orders" (
        "book_id",
        "customer_name",
        "created_by",
        "quantity",
        "timestamp"
      )
      VALUES
        (${book_id}, ${customer_name}, ${accessToken}, 1, ${new Date().getTime()})
      RETURNING
        "id"
    `

    await sql`
      UPDATE "books"
      SET "current_stock" = "current_stock" - $1
      WHERE "id" = ${book_id}
    `

    return NextResponse.json({
      created: true,
      order_id: id
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Either you had passed incorrect accessToken/book_id or there is some error.',
      error: error instanceof Error ? error : error
    })
  }


}