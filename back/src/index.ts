import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3031

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});