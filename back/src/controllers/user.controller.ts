import type { Request, Response, NextFunction } from "express";
import type { GetUsersQueryDto, CreateUserDto, UpdateUserDto } from "../schemas/user.schema.js";
import { getUsersService, getUserOrdersService, createUserService, updateUserService, deleteUserService } from "../services/user.service.js";
import { AppError } from "../utils/AppError.js";

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

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  const { targetUser } = req;

  try {
    return res.status(200).json({
      success: true,
      data: targetUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function getUserOrders(req: Request, res: Response, next: NextFunction) {
  const { id } = req.targetUser;

  try {
    if (!id) throw new AppError("Id must be a number.", 400);

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
  const { body } = req

  const createdUser = {
    name: body.name,
    email: body.email,
    password: body.password
  } as CreateUserDto;

  try {
    const newUser = await createUserService(createdUser);

    return res.status(201).json({
      success: true,
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
    if (!id) throw new AppError("Id must be a number.", 400);

    const updatedUser = await updateUserService(id, body as UpdateUserDto);

    return res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.targetUser;

  try {
    if (!id) throw new AppError("Id must be a number.", 400);

    await deleteUserService(id);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}