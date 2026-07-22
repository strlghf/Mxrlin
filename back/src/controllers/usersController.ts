import type { Request, Response, NextFunction } from "express";
import { getUsersService, getUserOrdersService, createUserService, updateUserService, deleteUserService } from "../services/usersServices";

type filterUsers = "name" | "email";

export async function getUsers (req: Request, res: Response, next: NextFunction) {
  const { filter, value } = req.query;

  try {
    const users = await getUsersService(filter as filterUsers, value as string);
    
    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    return next(error);
  }
}

export async function getUserById (req: Request, res: Response) {
  const { user } = req;

  return res.status(200).json({
    success: true,
    data: user
  });
}

export async function getUserOrders (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

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

export async function createUser (req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  try {
    const user = { name, email, password };

    const newUser = await createUserService(user);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateUser (req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const { id } = req.user;

  try {
    const updatedUser = await updateUserService(id, body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser (req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  try {
    await deleteUserService(id);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}