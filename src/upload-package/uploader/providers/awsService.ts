import fs = require("fs");
import aws = require("aws-sdk");
import S3 = require("aws-sdk/clients/s3");
import path = require("path");
import { IFileUpload } from "../../types/interface";

export class AWS implements IFileUpload {
  s3 = new aws.S3();
  constructor(s3 = new aws.S3()) {
    this.s3 = s3;
  }

  async uploadFile(creadentials: any, file: any) {
    const accessKeyId = creadentials.accessKeyId;
    const secretAccessKey = creadentials.secretAccessKey;
    const region = creadentials.region;
    const bucketName = creadentials.bucketName;
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };
    const s3 = new S3({ region, accessKeyId, secretAccessKey });
    return await s3.upload(uploadParams).promise();
  }

  async deleteFile(creadentials: any, file: any) {
    const bucketName = creadentials.bucketName;
    const fileName = "1c252a33f39330ee1365ccd6a23541fb";
    const params = {
      Bucket: "greeho-img",
      Key: "ade52f59f21c4e6945bfc0fde449b367",
    };

    const result = this.s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log("from service", data);
        return data;
      } // successful response
    });
  }

  async getFile(fileName: string, bucketName: string) {
    const file = require("fs").createWriteStream(fileName);
    if (file) return file;
    else return false;
  }
}
