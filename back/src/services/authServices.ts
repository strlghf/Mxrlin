import { prisma } from "../db/prisma";
import type { CreateUserDto } from "../schemas/usersSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Firma jwt
export async function registerService (userData: CreateUserDto, password: string) {
  const user = await prisma.users.findUnique({ where: userData });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, userData.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { user, token }
}

// export async function loginService(email, password) {
//   const user = await prisma.users.findUnique({ where: userData });
//   if (!user) throw new Error("Invalid credentials");

//   const match = await bcrypt.compare(password, userData.password);
//   if (!match) throw new Error("Invalid credentials");

//   const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

//   return { user, token }
// }