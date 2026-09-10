import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT ?? 3031;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});