import { Request, Response } from "express";
import { testScores } from "../service/examinee.service";
// import { Num } from 'example-typescript-package';
import { AWS } from "upload-groots";

export async function myTestScoresHandler(req: Request, res: Response) {
  const myScores = await testScores();
  return res.status(200).json({ myScores });
}
export async function myTest(req: Request, res: Response) {
  let file = req.file;
  const aws = new AWS();

  const accessKeyId = "AKIA5UQZIKYENZREEJFF";
  const secretAccessKey = "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";
  const region = "ap-southeast-1";
  const bucketName = "greeho-img";

  const credential = {
    accessKeyId,
    secretAccessKey,
    region,
    bucketName,
  };

  const credentials = await aws.uploadFile(credential, file);

  console.log(credentials);
}
