import { prisma } from "../db/prisma";
import type { GetUsersQueryDto, GetUserIdDto, CreateUserDto, UpdateUserDto } from "../schemas/usersSchema";

export async function getUsersService (filter?: GetUsersQueryDto["filter"], value?: string) {
  if (filter && value) {
    return await prisma.users.findMany({
      where: {
        [filter]: { contains: value, mode: "insensitive" }
      },
      select: { id: true, name: true, email: true, created_at: true }
    })
  }

  return await prisma.users.findMany({
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function createUserService (userData: CreateUserDto) {
  return await prisma.users.create({
    data: userData,
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function updateUserService (id: GetUserIdDto, data: UpdateUserDto) {
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  )
  
  return await prisma.users.update({
    where: { id },
    data: cleanData,
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function deleteUserService (id: GetUserIdDto) {
  return await prisma.users.delete({
    where: { id }
  })
}