import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { db, pool } from "../db";
import { User } from "../types";
import { generateToken } from "../utils";

export async function POST(
  request: NextRequest,
  event: NextFetchEvent
) {
  const user: User = await request.json()

  if (
    user.client_email.trim() === '' ||
    user.client_name.trim() === ''
  ) {
    return NextResponse.json({
      error: "Pass correct 'client_email' and 'client_name'."
    })
  }

  const isExist = await db
    .selectFrom('users')
    .selectAll()
    .where('client_email', '=', user.client_email)
    .execute()

  if (isExist.length > 0) {
    return NextResponse.json({
      error: "User exist!"
    })
  }

  await db
    .insertInto('users')
    .values(user)
    .returning('id')
    .executeTakeFirstOrThrow()

  event.waitUntil(pool.end());

  const accessToken = generateToken(user);

  return NextResponse.json({ accessToken });
}
