import type { Request, Response, NextFunction } from "express";
import { getUsersService, getUserOrdersService, createUserService, updateUserService, deleteUserService } from "../services/user.service";
import type { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from "../schemas/user.schema";

type filterUsers = "name" | "email" | "role";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  const { page, limit, filter, value } = req.query as Partial<GetUsersQueryDto>;

  try {
    const users = await getUsersService(page || 1, limit || 10, filter as filterUsers, value as string);
    
    return res.status(200).json({
      success: true,
      data: users.data,
      pagination: users.pagination
    });
  } catch (error) {
    return next(error);
  }
}

export async function getUserById(req: Request, res: Response) {
  const { targetUser } = req;

  return res.status(200).json({
    success: true,
    data: targetUser
  });
}

export async function getUserOrders(req: Request, res: Response, next: NextFunction) {
  const { id } = req.targetUser;

  try {
    const orders = await getUserOrdersService(id);

    return res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    return next(error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { body} = req

  try {
    const newUser = await createUserService(body as CreateUserDto);

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: newUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const { id } = req.targetUser;

  try {
    const updatedUser = await updateUserService(id, body as UpdateUserDto);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.targetUser;

  try {
    await deleteUserService(id);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}