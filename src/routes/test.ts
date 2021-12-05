import { Express } from "express";
import requireUser from "../middleware/requireUser";
import { createTestHandler, getTestHandler } from "../controller/test.controller";
import {CreateTestInput} from '../schema/test.schema';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

function routes(app: Express) {
    /**
 * @openapi
 * '/api/tests':
 *  post:
 *     tags:
 *     - Tests
 *     summary: Create a test/quiz question importing a csv file
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateTestInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateTestResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
    app.post("/api/tests", [requireUser, upload.single('question')], createTestHandler);
    app.get("/api/tests/:testId", getTestHandler);
}

export default routes;
