import { Request, Response } from "express";
import { testScores } from "../service/examinee.service";
import { fileStorageAws, fileStorageGcp } from "../upload-package/app";

export async function myTestScoresHandler(req: Request, res: Response) {
  const myScores = await testScores();
  return res.status(200).json({ myScores });
}

export async function myTest(req: Request, res: Response) {
  let file = req.file;

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

  let uploads = await fileStorageAws.delete(credential, file);
  console.log("From controller", uploads);
  return res.status(200).json({ uploads });
}
