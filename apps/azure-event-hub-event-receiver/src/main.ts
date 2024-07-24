import { NestFactory } from '@nestjs/core';
import { AzureEventHubEventReceiverModule } from './azure-event-hub-event-receiver.module';

async function bootstrap() {
  const app = await NestFactory.create(AzureEventHubEventReceiverModule);
  await app.listen(3002);
}
bootstrap();
