import { createApp } from "./server";
import { env } from "./config/env";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
});
