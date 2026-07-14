import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function authToken (req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You didn't send the token"
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized"
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return next(error);
  }
}

// export function validateToken(req: Request, res: Response, next: NextFunction) {
//   const { user } = req;

//   const accessToken = generateAccessToken(user);
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//   res.json({ accessToken, refreshToken });
// }

export function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "10min" });
}