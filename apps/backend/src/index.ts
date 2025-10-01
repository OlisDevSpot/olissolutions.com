import { createApp } from "./lib/create-app";
import indexRoute from "./routes/index.route";

const app = createApp()
  .route("/", indexRoute);

export default app;
export type AppRouter = typeof app;
