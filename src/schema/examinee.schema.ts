import { object, number, string, TypeOf } from "zod";
import _responce from "../utils/responce";


const payload = {
  body: object({
    ip: string({ required_error: _responce.required }),
    username: string({ required_error: _responce.required })
      .min(120, _responce.tooShort),
  }),
};

const params = {
  params: object({
    productId: string({ required_error: _responce.required }),
  }),
};

export const createExamineeSchema = object({ ...payload });
export type CreateExamineeInput = TypeOf<typeof createExamineeSchema>;
