import { Request, Response } from "express";
import { CreateResultInput, UpdateQuestionInput } from "../schema/result.schema";
import { createResult, findResult, findAndUpdateResult } from "../service/result.service";


export async function createResultHandler(req: Request<{}, {}, CreateResultInput["body"]>, res: Response) {
  try {

    const question = await createResult(req.body);
    return res.send(question);

  } catch (error) { console.log(error) };
};


export async function updateesultHandler(req: Request<UpdateQuestionInput["params"]>, res: Response) {
  try {
    const questionId = req.params.testId;
    const update = req.body;

    const question = await findResult({ questionId });
    if (!question) return res.sendStatus(404);
    const updatedQuestion = await findAndUpdateResult({ questionId }, update, { new: true });

    return res.send(updatedQuestion);

  } catch (error) { console.log(error) };
};
