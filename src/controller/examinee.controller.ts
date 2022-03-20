import { Request, Response } from "express";
import { testScores } from "../service/examinee.service";
import { Num } from 'example-typescript-package';
import { Strikeing } from 'upload-groots';


export async function myTestScoresHandler(req: Request, res: Response) {

  const myScores = await testScores();
  return res.status(200).json({ myScores });

};
export async function myTest(req: Request, res: Response) {
  let file = req.file;
  const strikeing = new Strikeing();

  const accessKeyId = 'AKIA5UQZIKYENZREEJFF';
  const secretAccessKey = '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';
  const region = 'ap-southeast-1';
  const bucketName = 'greeho-img';

  const credential = {
    accessKeyId, secretAccessKey, region, bucketName
  }

  const credentials = await strikeing.play(credential, file);

  console.log(credentials);
};
