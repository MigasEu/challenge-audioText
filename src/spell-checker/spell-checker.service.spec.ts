import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { SpellCheckerService } from './spell-checker.service';

describe('SpellCheckerService', () => {
  let service: SpellCheckerService;
  let loggerMock: PinoLogger;

  beforeEach(async () => {
    loggerMock = mock(PinoLogger);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpellCheckerService,
        { provide: PinoLogger, useValue: instance(loggerMock) },
      ],
    }).compile();

    service = module.get<SpellCheckerService>(SpellCheckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', async () => {
    const originalText = 'originalText';
    when(loggerMock.info(anyString(), anyString())).thenReturn(undefined);

    const result = await service.fixText(originalText);

    expect(result).toEqual(`fixed: ${originalText}`);
    verify(loggerMock.info('fixing text', originalText)).once();
  });
});
