import { Injectable } from '@nestjs/common';
import { AudioInterpreterService } from './audio-interpreter/audio-interpreter.service';
import { SpellCheckerService } from './spell-checker/spell-checker.service';

@Injectable()
export class AppService {
  constructor(
    private readonly audioInterpreter: AudioInterpreterService,
    private readonly spellCheckerService: SpellCheckerService,
  ) {}

  async fixAudio(originalAudio: Buffer): Promise<Buffer> {
    const originalText = await this.audioInterpreter.audioToText(originalAudio);

    const fixedText = await this.spellCheckerService.fixText(originalText);

    return this.audioInterpreter.textToAudio(fixedText);
  }
}
