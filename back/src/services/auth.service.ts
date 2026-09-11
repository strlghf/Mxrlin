import { prisma } from "../db/prisma.js";
import type { GetUserIdDto, CreateUserDto, UserLoginDto } from "../schemas/user.schema.js";
import { createUserService } from "./user.service.js";
import { comparePassword } from "../utils/helpers.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { env } from "../env.js";

const userSelect = { id: true, role: true, name: true, password: true, email: true, created_at: true } as const;
const userSelectPublic = { id: true, role: true, name: true, email: true, created_at: true } as const;

export async function registerService(userData: CreateUserDto) {
  const newUser = await createUserService(userData);
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, env.JWT_SECRET, { expiresIn: "7d" });

  return { newUser, token }
}

export async function loginService(userData: UserLoginDto) {
  const user = await prisma.users.findUnique({
    where: { email: userData.email },
    select: userSelect
  });
  if (!user) throw new AppError("Invalid credentials.", 401);

  const match = await comparePassword(userData.password, user.password);
  if (!match) throw new AppError("Invalid credentials.", 401);

  const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: "7d" });

  const loggedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at
  }

  return { loggedUser, token }
}

export async function showUserService(id: GetUserIdDto) {
  const findUser = await prisma.users.findUnique({ where: { id }, select: userSelectPublic });
  if (!findUser) throw new AppError("User not found.", 404);

  return { findUser }
}