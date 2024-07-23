import { NestFactory } from '@nestjs/core';
import { AzureEventHubEventSenderModule } from './azure-event-hub-event-sender.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AzureEventHubEventSenderModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  await app.listen(3001);
}
bootstrap();
