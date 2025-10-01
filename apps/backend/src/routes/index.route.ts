import { createRouter } from "../lib/create-app";

const indexRoute = createRouter()
  .get("/", (c) => {
    return c.json("Hello from INDEX ROUTE!");
  })

export default indexRoute;
