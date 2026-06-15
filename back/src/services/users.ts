import { prisma } from "../db/prisma";
import type { UserData } from "../types/types";

export async function getUsersService (filter?: string, value?: string) {
  if (filter && value) {
    return await prisma.users.findMany({
      where: {
        [filter]: {
          contains: value,
          mode: "insensitive"
        }
      },
      select: { id: true, name: true, email: true, created_at: true }
    })
  }

  return await prisma.users.findMany({
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function createUserService (userData: UserData) {
  return await prisma.users.create({
    data: userData,
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function updateUserService (id: number, data: any) {
  return await prisma.users.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function deleteUserService (id: number) {
  return await prisma.users.delete({
    where: { id }
  })
}