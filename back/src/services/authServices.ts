import { prisma } from "../db/prisma";
import type { CreateUserDto, UserAuthDto } from "../schemas/usersSchema";
import { createUserService } from "./usersServices";
import { comparePassword } from "../utils/helpers";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSelect = { id: true, role: true, name: true, password: true, email: true, created_at: true } as const;

export async function registerService(userData: CreateUserDto) {
  const newUser = await createUserService(userData);
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { newUser, token }
}

export async function loginService(userData: UserAuthDto) {
  const user = await prisma.users.findUnique({ where: { email: userData.email }, select: userSelect });
  if (!user) throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const match = await comparePassword(userData.password, user.password);
  if (!match) throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  const loggedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at
  }

  return { loggedUser, token }
}