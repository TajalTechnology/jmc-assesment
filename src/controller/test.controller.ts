import { Request, Response } from "express";
import { ReadTestInput } from "../schema/test.schema";
import { createTest, testDetails } from "../service/test.service";


export async function createTestHandler(req: Request, res: Response) {

  const body = req.body;
  const test = await createTest({
    ...body,
    testCreator: res.locals.user._id,
    filePath: req.file.path,
    file: req.file
  });

  return res.status(200).json({ test });
};


export async function getTestHandler(req: Request<ReadTestInput["params"]>, res: Response) {

  const detailsTest = await testDetails({ setId: req.params.testId });
  return res.status(200).json({ detailsTest });

};