import { rateLimit } from "express-rate-limit";

export const loginRateLimit = rateLimit({
  windowMs: 3 * 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: true,
  skipSuccessfulRequests: true
});