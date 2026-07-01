import { prisma } from "../db/prisma";
import jwt from "jsonwebtoken";

export async function loginService (email: string, password: string) {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  
}