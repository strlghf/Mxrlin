import type { Request, Response, NextFunction } from "express";
import { getUsersService, createUserService, updateUserService, deleteUserService } from "../services/users";

type filterUsers = "name" | "email" | undefined;

export async function getUsers (req: Request, res: Response, next: NextFunction) {
  const { filter, value } = req.query;

  try {
    const users = await getUsersService(filter as filterUsers, value as string);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById (req: Request, res: Response) {
  return res.status(200).json(req.user);
}

export async function createUser (req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    const newUser = await createUserService(body);
    return res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
}

export async function updateUser (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { body } = req;

  try {
    const parsedId = Number(id);

    const updatedUser = await updateUserService(parsedId, body);
    return res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const parsedId = Number(id);

    const deleteUser = await deleteUserService(parsedId);
    return res.status(204).json({ message: "User deleted", data: deleteUser })
  } catch (error) {
    next(error);
  }
}