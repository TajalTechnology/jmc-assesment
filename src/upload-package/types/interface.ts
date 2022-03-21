export interface IFileUpload {
  uploadFile(creadentials: any, file: any): any;
  deleteFile(creadentials: any, file: any): any;
  getFile(fileName: string, bucketName: string): any;
}

export enum Providers {
  AWS = 'AWS',
  GCP = 'GCP',
}
