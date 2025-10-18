import { createRouter } from "../lib/create-app";
import { getCookie, setCookie } from "hono/cookie"

const indexRoute = createRouter()
  .get("/", (c) => {
    const cookie = getCookie(c, "olis-cookie")
    return c.json({ msg: "Hello from INDEX ROUTE!", cookie: cookie || "no cookie set" });
  })
  .get("hello", (c) => {
    return c.json({ msg: "Hello from HELLO ROUTE!" });
  })
  .get("/set-cookie", (c) => {
    setCookie(c, "olis-cookie", "cool-name-bro", {
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: false
    })
    return c.json({ msg: "Cookie set!" });
  })

export default indexRoute;
