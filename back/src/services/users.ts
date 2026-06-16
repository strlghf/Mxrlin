import { prisma } from "../db/prisma";
import type { getUserDto, getUserIdDto, createUserDto, updateUserDto } from "../schemas/usersSchema";

type GetUsersQuery = getUserDto["query"];
type UserIdParam = getUserIdDto["params"]["id"];
type CreateUserBody = createUserDto["body"];
type UpdateUserBody = updateUserDto["body"];

export async function getUsersService (filter?: GetUsersQuery["filter"], value?: string) {
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

export async function createUserService (userData: CreateUserBody) {
  return await prisma.users.create({
    data: userData,
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function updateUserService (id: UserIdParam, data: UpdateUserBody) {
  return await prisma.users.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, created_at: true }
  })
}

export async function deleteUserService (id: UserIdParam) {
  return await prisma.users.delete({
    where: { id }
  })
}