import { Express } from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createResultSchema } from "../schema/result.schema";
import { createResultHandler } from "../controller/result.controller";


function routes(app: Express) {
    app.post("/api/results", validateResource(createResultSchema), createResultHandler);
}

export default routes;
