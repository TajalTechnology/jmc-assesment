import { Express, Request, Response } from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { updateQuestionHandler } from "../controller/question.controller";
import { updateQuestionSchema } from "../schema/question.schema";

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

function routes(app: Express) {
    // app.post("/api/questions", upload.single('question'), validateResource(createQuestionSchema), createQuestionHandler);
    app.put("/api/questions/:questionId", validateResource(updateQuestionSchema), updateQuestionHandler);
}

export default routes;
