import { Express } from "express";
import { myTestScoresHandler } from "../controller/examinee.controller";


function routes(app: Express) {
    // app.post("/api/examinees", requireUser, getExamineeHandler);
    /**
    * @openapi
    * /api/examinee:
    *  get:
    *     tags:
    *     - Examinee
    *     description: Responds examinee all tests score and rank
    *     responses:
    *       200:
    *         description: App is up and running
    */
    app.get("/api/examinee", myTestScoresHandler);
}

export default routes;
