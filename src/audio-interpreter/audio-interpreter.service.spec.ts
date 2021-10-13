import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { mock, instance, when, anyString, anything, verify } from 'ts-mockito';
import { AudioInterpreterService } from './audio-interpreter.service';

describe('AudioInterpreterService', () => {
  let service: AudioInterpreterService;
  let loggerMock: PinoLogger;

  beforeEach(async () => {
    loggerMock = mock(PinoLogger);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AudioInterpreterService,
        { provide: PinoLogger, useValue: instance(loggerMock) },
      ],
    }).compile();

    service = module.get<AudioInterpreterService>(AudioInterpreterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should transform audio to text', async () => {
    const originalAudio = Buffer.from('test');
    when(loggerMock.info(anyString(), anything())).thenReturn(undefined);

    const result = await service.audioToText(originalAudio);

    expect(typeof result).toEqual('string');
    verify(loggerMock.info('audio to text', originalAudio)).once();
  });

  it('should transform text to audio', async () => {
    const originalText = 'test';
    when(loggerMock.info(anyString(), anything())).thenReturn(undefined);

    const result = await service.textToAudio(originalText);

    expect(result).toEqual(Buffer.from(originalText));
    verify(loggerMock.info('text to audio', originalText)).once();
  });
});
