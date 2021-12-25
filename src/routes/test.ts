import { Express } from "express";
import requireUser from "../middleware/requireUser";
import { createTestHandler, getTestHandler } from "../controller/test.controller";
import { CreateTestInput } from '../schema/test.schema';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

function routes(app: Express) {
    app.post("/api/tests", [requireUser, upload.single('question')], createTestHandler);
    app.get("/api/tests/:testId", getTestHandler);
}

export default routes;
