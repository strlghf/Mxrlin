import { prisma } from "../db/prisma";
import type { CreateUserDto, UserAuthDto } from "../schemas/usersSchema";
import { createUserService } from "./usersServices";
import { comparePassword } from "../utils/helpers";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSelect = { id: true, role: true, name: true, password: true, email: true } as const;

export async function registerService(userData: CreateUserDto) {
  const newUser = await createUserService(userData);
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  // const refreshToken = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

  return { newUser, token }
}

export async function loginService(userData: UserAuthDto) {
  const user = await prisma.users.findUnique({ where: { email: userData.email }, select: userSelect });
  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(userData.password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  const loggedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  return { loggedUser, token }
}