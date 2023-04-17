import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const user = verify(
      params.token,
      process.env.JWT_SECRET!
    );

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    throw new Error("You are not permitted");
  }
}