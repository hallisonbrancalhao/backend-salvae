import { Injectable } from '@nestjs/common';
import { UploadImageDto } from 'src/core/infra';
import { FtpService } from 'src/utilities';

@Injectable()
export class ImagesService {
  constructor(private readonly ftp: FtpService) {}

  async upload(
    file: UploadImageDto,
    folder: string,
    name: string,
  ): Promise<string> {
    try {
      const pathFile = await this.ftp.saveImage(file, folder, name);
      return pathFile;
    } catch (error) {
      throw new Error(error);
    }
  }
}
