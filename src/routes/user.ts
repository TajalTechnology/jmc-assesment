import { Express } from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSessionHandler } from "../controller/session.controller";


function routes(app: Express) {
    /**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user for create a authentic quiz questions
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 * 
 */


    /**
* @openapi
* '/api/sessions':
*  post:
*     tags:
*     - User
*     summary: Create a jwt token and refresh token
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schemas/CreateSessionsInput'
*     responses:
*      200:
*        description: Success
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/CreateSessionsResponse'
*      409:
*        description: Conflict
*      400:
*        description: Bad request
* 
*/
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);
}

export default routes;
