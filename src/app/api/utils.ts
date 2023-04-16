import { sign } from "jsonwebtoken";

export function generateToken(user: User) {
  return sign(
    user,
    process.env.NEXT_PUBLIC_JWT_SECRET!,
    { expiresIn: '7d' }
  );
}
