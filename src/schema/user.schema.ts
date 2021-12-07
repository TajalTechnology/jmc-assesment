import { object, string, TypeOf } from "zod";
import _responce from "../utils/responce";


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
