import { object, number, string, TypeOf, array } from "zod";
const payload = {
  body: object({
    question: string({
      required_error: "Title is required",
    }),
    optionA: string({
      required_error: "Title is required",
    }),
    optionB: string({
      required_error: "Title is required",
    }),
    optionC: string({
      required_error: "Title is required",
    }),
    optionD: string({
      required_error: "Title is required",
    }),
    answer: string({
      required_error: "Title is required",
    }),
  }),
};

const params = {
  params: object({
    questionId: string({
      required_error: "questionId is required",
    }),
  }),
};

export const createQuestionSchema = object({
  ...payload,
});

export const updateQuestionSchema = object({
  ...payload,
  ...params,
});

// export const deleteProductSchema = object({
//   ...params,
// });

// export const getProductSchema = object({
//   ...params,
// });

export type CreateQuestionInput = TypeOf<typeof createQuestionSchema>;
export type UpdateQuestionInput = TypeOf<typeof updateQuestionSchema>;
// export type ReadProductInput = TypeOf<typeof getProductSchema>;
// export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
