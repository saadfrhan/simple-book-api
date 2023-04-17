import { NextRequest, NextResponse } from "next/server";
import { User } from "../types";
import { generateToken } from "../utils";
import sql from "../db";

export async function POST(request: NextRequest) {
  const user: User = await request.json()

  if (
    user.client_email.trim() === '' ||
    user.client_name.trim() === ''
  ) {
    return NextResponse.json({
      error: "Pass correct 'client_email' and 'client_name'."
    })
  }

  const isExist = await sql<(User & { id: number })[]>`
    SELECT * FROM users 
    WHERE client_email = ${user.client_email}
  `

  if (isExist.length > 0) {
    return NextResponse.json({
      error: "User exist!"
    })
  }

  await sql`
    INSERT INTO users (client_email, client_name) 
    VALUES (${user.client_email}, ${user.client_name})
  `

  const accessToken = generateToken(user);

  return NextResponse.json({ accessToken });
}
