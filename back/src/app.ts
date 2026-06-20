import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3031;

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" })
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});