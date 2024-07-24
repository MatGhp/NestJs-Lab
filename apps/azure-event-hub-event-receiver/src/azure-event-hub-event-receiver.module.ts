import { Module } from '@nestjs/common';
import { EventReceiverService } from './event-receiver.service';
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
  ],
  controllers: [],
  providers: [EventReceiverService],
})
export class AzureEventHubEventReceiverModule {}
