import { Express, Request, Response } from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createTestHandler,getTestHandler } from "../controller/test.controller";
import { createTestSchema, updateTestSchema } from "../schema/test.schema";

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

function routes(app: Express) {
    app.post("/api/tests", [requireUser, upload.single('question')], createTestHandler);
    app.get("/api/tests/:testId", getTestHandler);
    // app.put("/api/questions/:questionId", validateResource(updateQuestionSchema), updateQuestionHandler);
}

export default routes;
