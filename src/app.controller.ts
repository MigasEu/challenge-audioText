import {
  Controller,
  Header,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO: validate file is given + extension
  @Post('fixAudio')
  @Header('content-type', 'application/octet-stream')
  @UseInterceptors(FileInterceptor('file'))
  async fixAudio(@UploadedFile() file: Express.Multer.File): Promise<Buffer> {
    return this.appService.fixAudio(file.buffer);
  }
}
