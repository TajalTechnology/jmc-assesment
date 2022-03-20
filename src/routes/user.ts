import { Express } from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createUserHandler, createDynamicModelHandler } from "../controller/user.controller";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSessionHandler } from "../controller/session.controller";


function routes(app: Express) {
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);
    app.post("/api/dynamic-model", createDynamicModelHandler);
}

export default routes;
