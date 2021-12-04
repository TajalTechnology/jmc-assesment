import { object, number, string, TypeOf, array, any } from "zod";
const payload = {
  body: object({
    // z.string().array().min(5);
    // correctAnswer: string().array(),
    // wrongAnswer: string().array(),
    // answers: object().array(),
    answers: object({
      // required_error: "Title is required",
    }).array(),
    testId: string({
      required_error: "Title is required",
    }),
    // score: number(),
    // rank: number(),
  }),
};

const params = {
  params: object({
    testId: string({
      required_error: "questionId is required",
    }),
  }),
};

export const createResultSchema = object({
  ...payload
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

export type CreateResultInput = TypeOf<typeof createResultSchema>;
export type UpdateQuestionInput = TypeOf<typeof updateQuestionSchema>;
// export type ReadProductInput = TypeOf<typeof getProductSchema>;
// export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
