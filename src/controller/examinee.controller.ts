import { Request, Response } from "express";
import { testScores } from "../service/examinee.service";


export async function myTestScoresHandler(req: Request, res: Response) {

  const myScores = await testScores();
  return res.status(200).json({ myScores });

};
