import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors(
  { credentials: true, origin: process.env.CLIENT_URL },
));
app.use(cookieParser());
app.use(morgan("short"));
app.use(helmet());
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Backend working." });
});

app.use(errorHandler);

export default app;