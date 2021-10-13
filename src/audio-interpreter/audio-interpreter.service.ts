import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AudioInterpreterService {
  constructor(private readonly logger: PinoLogger) {}

  async audioToText(audio: Buffer): Promise<string> {
    this.logger.info('audio to text', audio);

    return Math.random().toString(36);
  }

  async textToAudio(originalText: string): Promise<Buffer> {
    this.logger.info('text to audio', originalText);

    return Buffer.from(originalText);
  }
}
