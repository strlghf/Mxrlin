import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3031;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});