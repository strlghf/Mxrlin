import { prisma } from "../db/prisma";
import type { GetUsersQueryDto, GetUserIdDto, CreateUserDto, UpdateUserDto } from "../schemas/usersSchema";

const userSelect = { id: true, name: true, email: true, created_at: true } as const;

export async function getUsersService (filter?: GetUsersQueryDto["filter"], value?: string) {
  if (filter && value) {
    return await prisma.users.findMany({
      where: {
        [filter]: { contains: value, mode: "insensitive" }
      },
      select: userSelect
    });
  }

  return await prisma.users.findMany({
    select: userSelect
  });
}

export async function getUserOrdersService (userId: GetUserIdDto) {
  const userExists = await prisma.users.findUnique({
    where: { id: userId }
  })

  if (!userExists) {
    throw new Error("User not found");
  }

  const orders = await prisma.orders.findMany({
    where: {
      user_id: userId
    },
    include: {
      orders_items: true
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return orders;
}

export async function createUserService (userData: CreateUserDto) {
  return await prisma.users.create({
    data: userData,
    select: userSelect
  });
}

export async function updateUserService (id: GetUserIdDto, data: UpdateUserDto) {
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );
  
  return await prisma.users.update({
    where: { id },
    data: cleanData,
    select: userSelect
  });
}

export async function deleteUserService (id: GetUserIdDto) {
  return await prisma.users.delete({
    where: { id }
  });
}