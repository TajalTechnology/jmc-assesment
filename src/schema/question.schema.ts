import { object, number, string, TypeOf, array } from "zod";
import _responce from "../utils/responce";


const payload = {
  body: object({
    question: string({ required_error: _responce.required }),
    optionA: string({ required_error: _responce.required }),
    optionB: string({ required_error: _responce.required }),
    optionC: string({ required_error: _responce.required }),
    optionD: string({ required_error: _responce.required }),
    answer: string({ required_error: _responce.required }),
  }),
};

const params = {
  params: object({
    questionId: string({ required_error: _responce.required }),
  }),
};

export const createQuestionSchema = object({ ...payload });
export const updateQuestionSchema = object({ ...payload, ...params });

export type CreateQuestionInput = TypeOf<typeof createQuestionSchema>;
export type UpdateQuestionInput = TypeOf<typeof updateQuestionSchema>;
