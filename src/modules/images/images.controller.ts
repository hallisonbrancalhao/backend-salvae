import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { UploadImageDto } from 'src/core/infra';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Imagens')
@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Get(':id/:image')
  async getImages(@Param('id') id: string, @Param('image') image: string) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: UploadImageDto,
  ) {
    return this.imageService.upload(file, '109.479.339-64', 'profile');
  }
}
