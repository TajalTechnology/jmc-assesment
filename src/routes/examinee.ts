import { Express, Request, Response } from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { myTestScoresHandler } from "../controller/examinee.controller";
import { createTestSchema, updateTestSchema } from "../schema/test.schema";

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

function routes(app: Express) {
    // app.post("/api/examinees", requireUser, getExamineeHandler);
    app.get("/api/examinee", myTestScoresHandler);
    // app.put("/api/questions/:questionId", validateResource(updateQuestionSchema), updateQuestionHandler);
}

export default routes;
