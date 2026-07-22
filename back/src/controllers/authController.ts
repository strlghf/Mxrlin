import type { Request, Response, NextFunction } from "express";
import { loginService, registerService } from "../services/authServices";
import "dotenv/config";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    const { newUser, token } = await registerService(body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    // SHOULD NOT RETURN ROLE && PASSWORD
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
//   
// })

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    const { loggedUser, token } = await loginService(body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/"
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
    const parsedUser = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    }

    return res.status(200).json({
      success: true,
      data: parsedUser
    });
  } catch (error) {
    return next(error);
  }
}