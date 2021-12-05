import { object, number, string, TypeOf, array, date } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTestInput:
 *      type: object
 *      required:
 *        - testName
 *        - duration
 *        - questionLimit
 *        - filePath
 *      properties:
 *        testName:
 *          type: string
 *          default: bangla 2nd papper
 *        duration:
 *          type: number
 *          default: 25
 *        questionLimit:
 *          type: number
 *          default: 25
 *        filePath:
 *          type: string
 *          default: uploads/imageqwer.jpg
 *    CreateTestResponse:
 *      type: object
 *      properties:
 *        testName:
 *          type: string
 *        duration:
 *          type: number
 *        questionLimit:
 *          type: number
 *        filePath:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
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
