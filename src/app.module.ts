import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioInterpreterService } from './audio-interpreter/audio-interpreter.service';
import { SpellCheckerService } from './spell-checker/spell-checker.service';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AudioInterpreterService, SpellCheckerService],
})
export class AppModule {}
