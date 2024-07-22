import { Module } from '@nestjs/common';
import * as process from 'process';
import { configValidationSchema } from '@app/common/config/config.schema';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
