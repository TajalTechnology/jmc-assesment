import { IApp } from './types/app.interface';
import { IFileUpload, Providers } from './types/interface';
import { AWS } from './uploader/providers/awsService';
import { GCP } from './uploader/providers/gcpService';

export class FileStore implements IApp {
  protected uploader: IFileUpload;

  constructor(provider: Providers) {
    switch (provider) {
      case Providers.AWS:
        this.uploader = new AWS();
        break;

      default:
        this.uploader = new GCP();
    }
  }

  public upload(creadentials: any, file: any) {
    return this.uploader.uploadFile(creadentials, file);
  }

  public delete(creadentials: any, file: any) {
    return this.uploader.deleteFile(creadentials, file);
  }

  public getFile(fileName: string, bucketName: string) {
    return this.uploader.getFile(fileName, bucketName);
  }
}

export const fileStorageAws = new FileStore(Providers.AWS);
export const fileStorageGcp = new FileStore(Providers.GCP);
