import { Express } from "express";
import { myTestScoresHandler } from "../controller/examinee.controller";


function routes(app: Express) {
    app.get("/api/my-tests", myTestScoresHandler);
}

export default routes;
