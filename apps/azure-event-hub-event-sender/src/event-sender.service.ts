import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventHubProducerClient } from '@azure/event-hubs';

@Injectable()
export class EventSenderService implements OnModuleInit {
  private producerClient: EventHubProducerClient;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const connectionString = this.configService.get<string>(
      'EVENT_HUB_CONNECTION_STRING',
    );
    const eventHubName = this.configService.get<string>('EVENT_HUB_NAME');

    if (!connectionString || !eventHubName) {
      throw new Error('Missing EVENT_HUB_CONNECTION_STRING or EVENT_HUB_NAME');
    }

    this.producerClient = new EventHubProducerClient(
      connectionString,
      eventHubName,
    );
  }

  async sendMessage(message: string): Promise<void> {
    try {
      const batch = await this.producerClient.createBatch();
      batch.tryAdd({ body: message });

      await this.producerClient.sendBatch(batch);
      console.log(`Message sent: ${message}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
