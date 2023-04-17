import { User } from "./types";
import { sign } from 'jsonwebtoken'

export function generateToken(user: User) {
  return sign(
    user,
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
}
