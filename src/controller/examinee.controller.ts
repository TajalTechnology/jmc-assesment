import { Request, Response } from "express";
import { testScores } from "../service/examinee.service";
<<<<<<< HEAD
import { fileStorageAws, fileStorageGcp } from "../upload-package/app";
=======
// import { Num } from 'example-typescript-package';
import { AWS } from "upload-groots";
>>>>>>> 997c26f11854dd7ba997dc383f97067df6c3ddd6

export async function myTestScoresHandler(req: Request, res: Response) {
  const myScores = await testScores();
  return res.status(200).json({ myScores });
}
<<<<<<< HEAD

export async function myTest(req: Request, res: Response) {
  let file = req.file;
=======
export async function myTest(req: Request, res: Response) {
  let file = req.file;
  const aws = new AWS();
>>>>>>> 997c26f11854dd7ba997dc383f97067df6c3ddd6

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

<<<<<<< HEAD
  let uploads = await fileStorageAws.delete(credential, file);
  console.log("From controller", uploads);
  return res.status(200).json({ uploads });
=======
  const credentials = await aws.uploadFile(credential, file);

  console.log(credentials);
>>>>>>> 997c26f11854dd7ba997dc383f97067df6c3ddd6
}
