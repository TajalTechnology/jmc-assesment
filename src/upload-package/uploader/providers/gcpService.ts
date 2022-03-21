import fs = require('fs');
import path = require('path');
import { format } from 'prettier';
import S3 = require('aws-sdk/clients/s3');
import { IFileUpload } from '../../types/interface';
import { Storage, Bucket } from '@google-cloud/storage';
import { UPLOAD_CONSTANTS } from '../../types/upload.constants';

export class GCP implements IFileUpload {
  private storage: Storage;
  constructor() {
    this.storage = new Storage({});
  }

  async deleteFile(creadentials: any, file: any) {
    const bucket = creadentials.bucketName;

    const fileExits = await bucket.file(file.fileName).exists();
    if (!fileExits) throw new Error(UPLOAD_CONSTANTS.NOT_FOUND);

    const objectName = 'File name modification if need';
    return await bucket.file(objectName).delete();
  }

  async uploadFile(creadentials: any, file: any) {
    const storage = new Storage({ keyFilename: file.fileName });
    const bucket = storage.bucket(creadentials.bucketName);
    const linkFile = bucket.file(file.fileName);

    const stream = linkFile.createWriteStream({
      metadata: { contentType: file.mimetype },
      resumable: false,
    });

    stream.on('error', (err: string) => {
      throw new Error(UPLOAD_CONSTANTS.ERROR);
    });

    stream.on('finish', async () => {
      await bucket.file(file.fileName).makePublic();
      const publicUrl = format(`${UPLOAD_CONSTANTS.GCP_URL}/${bucket.name}/${linkFile.name}`);
      return publicUrl;
    });

    stream.end(file.buffer);
  }

  async getFile(fileName: string, bucketName: string) {
    const file = this.storage.bucket(bucketName).file(fileName);
    return file;
  }
}
