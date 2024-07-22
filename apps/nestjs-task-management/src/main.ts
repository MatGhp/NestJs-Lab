import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transfor.interceptor';
import * as process from 'process';
import { FileManagementModule } from '../../file-management';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(FileManagementModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = process.env.port;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
