import type { Request, Response, NextFunction } from "express";
import type { CreateUserDto, UserLoginDto } from "../schemas/user.schema";
import { loginService, registerService, showUserService } from "../services/auth.service";
import "dotenv/config";
import { AppError } from "../utils/AppError";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  const registeredUser = {
    name: body.name,
    email: body.email,
    password: body.password
  } as CreateUserDto;

  try {
    const { newUser, token } = await registerService(registeredUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  const logUser = {
    email: body.email,
    password: body.password
  } as UserLoginDto;

  try {
    const { loggedUser, token } = await loginService(logUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      data: loggedUser
    });
  } catch (error) {
    return next(error);
  }
}

export async function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    return res.status(200).json({
      success: true,
      message: "User has been logged out."
    });
  } catch (error) {
    return next(error);
  }
}

export async function showUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  try {
    if (!id) throw new AppError("Id must be a number.", 400);

    const { findUser } = await showUserService(id);

    return res.status(200).json({
      success: true,
      data: findUser
    });
  } catch (error) {
    return next(error);
  }
}