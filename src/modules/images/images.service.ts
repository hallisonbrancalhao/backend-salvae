import { Injectable } from '@nestjs/common';
import { UploadImageDto } from 'src/core/infra';

@Injectable()
export class ImagesService {
  constructor() {}

  async upload(file: UploadImageDto): Promise<string> {
    return 'ok';
  }
}
