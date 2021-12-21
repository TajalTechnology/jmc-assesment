import { object, string, TypeOf } from "zod";
import _responce from "../utils/responce";


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: md@gmail.com
 *        name:
 *          type: string
 *          default: tajal
 *        password:
 *          type: string
 *          default: 123456
 *        passwordConfirmation:
 *          type: string
 *          default: 123456
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        password:
 *          type: string
 *        passwordConfirmation:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    CreateSessionsInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: md@gmail.com
 *        password:
 *          type: string
 *          default: 123456 
 *    CreateSessionsResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *          default: "token"
 *        refreshToken:
 *          type: string
 *          default: "token"
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *  
 */



/* USER_INPUT_VALIDATION(name,password,email,passwordConfirmation) */
export const createUserSchema = object({
  body: object({
    name: string({ required_error: _responce.required }),
    password: string({ required_error: _responce.required }).min(6, _responce.tooShort),
    passwordConfirmation: string({ required_error: _responce.required }),
    email: string({ required_error: _responce.required }).email(_responce.notValid),

  }).refine((data) => data.password === data.passwordConfirmation, {
    message: _responce.passwordNoMatch,
    path: ["passwordConfirmation"],

  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;
