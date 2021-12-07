import { Express } from "express";
import validateResource from "../middleware/validateResource";
import { updateQuestionHandler } from "../controller/question.controller";
import { updateQuestionSchema } from "../schema/question.schema";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })

function routes(app: Express) {
    app.put("/api/questions/:questionId", validateResource(updateQuestionSchema), updateQuestionHandler);
}

export default routes;
