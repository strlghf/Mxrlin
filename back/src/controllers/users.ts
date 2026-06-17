import type { Request, Response, NextFunction } from "express";
import { getUsersService, createUserService, updateUserService, deleteUserService } from "../services/users";

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

export async function createUser (req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    const newUser = await createUserService(body);
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
  const { id } = req.params;
  const { body } = req;

  try {
    const parsedId = Number(id);

    const updatedUser = await updateUserService(parsedId, body);
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
  const { id } = req.params;

  try {
    const parsedId = Number(id);

    await deleteUserService(parsedId);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}