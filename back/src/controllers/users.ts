import type { Request, Response, NextFunction } from "express"
import { getUsersService } from "../services/users";

export async function getUsers (req: Request, res: Response, next: NextFunction) {
  const { filter, value } = req.query;

  try {
    const users = await getUsersService(filter as string, value as string);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ msg: "User not found" })
  }
}