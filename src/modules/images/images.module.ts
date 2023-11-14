import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { FtpService } from 'src/utilities';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, FtpService],
  exports: [ImagesService],
})
export class ImagesModule {}
