import { Test, TestingModule } from '@nestjs/testing';
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito';
import { AppService } from './app.service';
import { AudioInterpreterService } from './audio-interpreter/audio-interpreter.service';
import { SpellCheckerService } from './spell-checker/spell-checker.service';

describe('SpellCheckerService', () => {
  let service: AppService;
  let audioInterpreterMock: AudioInterpreterService;
  let spellCheckerMock: SpellCheckerService;

  beforeEach(async () => {
    audioInterpreterMock = mock(AudioInterpreterService);
    spellCheckerMock = mock(SpellCheckerService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: AudioInterpreterService,
          useValue: instance(audioInterpreterMock),
        },
        { provide: SpellCheckerService, useValue: instance(spellCheckerMock) },
      ],
    }).compile();

    service = module.get(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', async () => {
    const originalText = 'originalText';
    const originalBuffer = Buffer.from(originalText);
    const fixedText = 'fixed: originalText';
    const fixedBuffer = Buffer.from(fixedText);
    when(audioInterpreterMock.audioToText(anything())).thenResolve(
      originalText,
    );
    when(spellCheckerMock.fixText(anyString())).thenResolve(fixedText);
    when(audioInterpreterMock.textToAudio(anything())).thenResolve(fixedBuffer);

    const result = await service.fixAudio(originalBuffer);

    expect(result).toEqual(fixedBuffer);
    verify(audioInterpreterMock.audioToText(originalBuffer)).once();
    verify(spellCheckerMock.fixText(originalText)).once();
    verify(audioInterpreterMock.textToAudio(fixedText)).once();
  });
});
