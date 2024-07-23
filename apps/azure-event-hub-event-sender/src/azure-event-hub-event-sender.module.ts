import { Module } from '@nestjs/common';
import { EventSenderController } from './event-sender.controller';
import { EventSenderService } from './event-sender.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { configValidationSchema } from '@app/common/config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [EventSenderController],
  providers: [EventSenderService],
})
export class AzureEventHubEventSenderModule {}
