import { sign } from "@/utils/jwt";
import { User } from "./types";

export function generateToken(user: User) {
  return sign(
    user,
    process.env.NEXT_PUBLIC_JWT_SECRET!
  );
}
