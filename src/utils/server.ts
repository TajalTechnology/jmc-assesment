import express from "express";
import userRoutes from "../routes/user";
import testRoute from "../routes/test";
import examineeRoute from "../routes/examinee";
import reasultRoute from "../routes/reasult";
import deserializeUser from "../middleware/deserializeUser";

function createServer() {
  
  const app = express();
  app.use(express.json());
  app.use(deserializeUser);

  userRoutes(app);
  testRoute(app);
  examineeRoute(app);
  reasultRoute(app);

  return app;
}

export default createServer;
