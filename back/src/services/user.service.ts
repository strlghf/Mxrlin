import { prisma } from "../db/prisma";
import type { GetUsersQueryDto, GetUserIdDto, CreateUserDto, UpdateUserDto } from "../schemas/user.schema";
import { hashPassword } from "../utils/helpers";

type userRole = "admin" | "customer";
const userSelect = { id: true, role: true, name: true, email: true } as const;

export async function getUsersService(
  page: number,
  limit: number,
  filter?: GetUsersQueryDto["filter"],
  value?: string
) {
  const skip = (page - 1) * limit;
  
  if (filter && value) {
    if (filter === "role") {
      const [usersRole, totalCount] = await prisma.$transaction([
        prisma.users.findMany({
          skip,
          take: limit,
          where: { role: value as userRole},
          select: userSelect
        }),
        prisma.users.count({
          where: { role: value as userRole }
        })
      ]);

      return {
        data: usersRole,
        pagination: { page, limit, total: totalCount }
      }
    }

    const [users, totalCount] = await prisma.$transaction([
      prisma.users.findMany({
        skip,
        take: limit,
        where: {
          [filter]: { contains: value, mode: "insensitive" }
        },
        select: userSelect
      }),
      prisma.users.count({
        where: {
          [filter]: { contains: value, mode: "insensitive" }
        }
      })
    ]);

    return {
      data: users,
      pagination: { page, limit, total: totalCount }
    }
  }

  const [users, totalCount] = await prisma.$transaction([
    prisma.users.findMany({
      skip,
      take: limit,
      select: userSelect
    }),
    prisma.users.count()
  ]);

  return {
    data: users,
    pagination: { page, limit, total: totalCount }
  }
}

export async function getUserOrdersService(userId: GetUserIdDto) {
  return await prisma.orders.findMany({
    where: { user_id: userId },
    include: { 
      orders_items: {
        include: {
          products: true
        }
      }
    },
    orderBy: { created_at: "desc" }
  });
}

export async function createUserService(userData: CreateUserDto) {
  const hashedPassword = await hashPassword(userData.password);

  return await prisma.users.create({
    data: {
      ...userData,
      password: hashedPassword
    },
    select: userSelect
  });
}

export async function updateUserService(id: GetUserIdDto, data: UpdateUserDto) {
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  if (cleanData.password) {
    cleanData.password = await hashPassword(cleanData.password);
  }

  return await prisma.users.update({
    where: { id },
    data: cleanData,
    select: userSelect
  });
}

export async function deleteUserService(id: GetUserIdDto) {
  return await prisma.users.delete({
    where: { id }
  });
}