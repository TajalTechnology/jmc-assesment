import { object, number, string, TypeOf, array, date } from "zod";
const payload = {
  body: object({
    testName: string({
      required_error: "Title is required",
    }),
    duration: number({
      required_error: "Title is required",
    }),
    questionLimit: number({
      required_error: "Title is required",
    }),
    filePath: string({
      required_error: "Title is required",
    }),
  }),
};


const params = {
  params: object({
    testId: string({
      required_error: "questionId is required",
    }),
  }),
};

export const createTestSchema = object({
  ...payload,
});

export const updateTestSchema = object({
  ...payload,
  ...params,
});

// export const deleteProductSchema = object({
//   ...params,
// });

export const getTestSchema = object({
  ...params,
});

export type CreateTestInput = TypeOf<typeof createTestSchema>;
export type UpdateTestInput = TypeOf<typeof updateTestSchema>;
export type ReadTestInput = TypeOf<typeof getTestSchema>;
// export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
