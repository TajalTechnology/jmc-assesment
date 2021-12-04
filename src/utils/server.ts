import express from "express";
import routes from "../routes";
import testRoute from "../routes/test";
import examineeRoute from "../routes/examinee";
import deserializeUser from "../middleware/deserializeUser";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(deserializeUser);

  routes(app);
  testRoute(app);
  examineeRoute(app);

  return app;
}

export default createServer;
