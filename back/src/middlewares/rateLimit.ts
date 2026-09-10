import { rateLimit } from "express-rate-limit";

export const loginRateLimit = rateLimit({
  windowMs: 3 * 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
});