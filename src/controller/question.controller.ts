import { Request, Response } from "express";
import { UpdateQuestionInput } from "../schema/question.schema";
import { findQuestion, findAndUpdateQuestion } from "../service/question.service";

export async function updateQuestionHandler(req: Request<UpdateQuestionInput["params"]>, res: Response) {
  try {
    const questionId = req.params.questionId;
    const update = req.body;

    const question = await findQuestion({ questionId });
    if (!question) return res.sendStatus(404);
    const updatedQuestion = await findAndUpdateQuestion({ questionId }, update, { new: true });

    return res.send(updatedQuestion);

  } catch (error) { console.log(error) };
};
