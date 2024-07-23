import { NestFactory } from '@nestjs/core';
import { FileManagementModule } from './file-management.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(FileManagementModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
