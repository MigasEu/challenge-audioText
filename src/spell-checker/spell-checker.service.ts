import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class SpellCheckerService {
  constructor(private readonly logger: PinoLogger) {}

  async fixText(originalText: string): Promise<string> {
    this.logger.info('fixing text', originalText);
    return `fixed: ${originalText}`;
  }
}
