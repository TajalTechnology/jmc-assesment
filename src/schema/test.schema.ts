import { object, number, string, TypeOf } from "zod";
import _responce from "../utils/responce";

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

/* TEST_INPUT_VALIDATION(testName,duration,questionLimit,filePath) */
const payload = {

  body: object({
    testName: string({ required_error: _responce.required }),
    duration: number({ required_error: _responce.required }),
    questionLimit: number({ required_error: _responce.required }),
    filePath: string({ required_error: _responce.required }),
  }),
};

/* PARAMS ID VALIDATION */
const params = {
  params: object({ testId: string({ required_error: _responce.paramsId }) }),
};

export const createTestSchema = object({ ...payload });
export const updateTestSchema = object({ ...payload, ...params });
export const getTestSchema = object({ ...params });

export type CreateTestInput = TypeOf<typeof createTestSchema>;
export type UpdateTestInput = TypeOf<typeof updateTestSchema>;
export type ReadTestInput = TypeOf<typeof getTestSchema>;
