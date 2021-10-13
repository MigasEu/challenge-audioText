import { Test, TestingModule } from '@nestjs/testing';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let serviceMock: AppService;

  beforeEach(async () => {
    serviceMock = mock(AppService);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: instance(serviceMock) }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('fixAudio', () => {
    it('should fix audio text', async () => {
      const originalBuffer = Buffer.from('original');
      const fixedBuffer = Buffer.from('fixed');
      when(serviceMock.fixAudio(anything())).thenResolve(fixedBuffer);

      expect(
        await appController.fixAudio({
          buffer: originalBuffer,
        } as Express.Multer.File),
      ).toBe(fixedBuffer);

      verify(serviceMock.fixAudio(originalBuffer)).once();
    });
  });
});
