import app from "./app.js";
import { env } from "./env.js";

const PORT = env.PORT ?? 3031;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});