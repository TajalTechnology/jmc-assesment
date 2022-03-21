export interface IApp {
  upload(creadentials: any, file: any): any; // TODO: define valid return type
  delete(creadentials: any, file: any): any;
  getFile(fileName: string, bucketName: string): any;
}
