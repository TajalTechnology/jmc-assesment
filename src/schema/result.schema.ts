import { object, number, string, TypeOf, array, any } from "zod";
import _responce from "../utils/responce";


/* BODY_VALIDATION(answers,testId,score) */
const payload = {

  body: object({
    answers: object({}).array(),
    testId: string({ required_error: _responce.required }),
  }),

};

/* PARAMS_VALIDATION */
const params = {
  params: object({
    testId: string({ required_error: _responce.required }),
  }),
};

export const createResultSchema = object({ ...payload });
export const updateQuestionSchema = object({ ...payload, ...params });

export type CreateResultInput = TypeOf<typeof createResultSchema>;
export type UpdateQuestionInput = TypeOf<typeof updateQuestionSchema>;
