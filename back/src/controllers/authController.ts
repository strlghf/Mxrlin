import type { Request, Response, NextFunction } from "express";
import { loginService, registerService, showUserService } from "../services/authServices";
import "dotenv/config";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    const { newUser, token } = await registerService(body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      success: true,
      message: "User has been registered",
      data: newUser
    });
  } catch (error) {
    return next(error);
  }
}

// app.get("/protected", (req, res) => {
//   const { token } = req.cookies;
// })

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    const { loggedUser, token } = await loginService(body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "User has been logged",
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
      message: "User has been logged out"
    });
  } catch (error) {
    return next(error);
  }
}

export async function showUser(req: Request, res: Response, next: NextFunction) {
  const { user } = req;

  try {
    const { findUser } = await showUserService(user.id);

    return res.status(200).json({
      success: true,
      data: findUser
    });
  } catch (error) {
    return next(error);
  }
}