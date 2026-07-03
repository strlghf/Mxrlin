import type { Request, Response, NextFunction } from "express";
import { hashPassword, comparePassword } from "../utils/helpers";

export async function registerUser (req: Request, res: Response, next: NextFunction) {
  const { user } = req;

  if (!user) {
    throw new Error("Username doesn't exist");
  }

  try {
    const hashedPassword = await hashPassword(user.password);
    const isValid = await comparePassword(user.password, hashedPassword);

    if (!isValid) throw new Error("Password is not valid");

    // SHOULD NOT RETURN ROLE && PASSWORD
    return res.status(200).json({
      success: true,
      message: "User has been registered",
      data: {
        ...user,
        password: "_",
        role: "_"
      }
    })
  } catch (error) {
    return next(error);
  }
}

export async function loginUser (req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  try {
    const user = { username, password };
    return user;
  } catch (error) {
    return next(error)
  }
}