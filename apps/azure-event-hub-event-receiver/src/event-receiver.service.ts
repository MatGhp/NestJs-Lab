import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EventHubConsumerClient,
  EventHubConsumerClientOptions,
} from '@azure/event-hubs';

@Injectable()
export class EventReceiverService implements OnModuleInit, OnModuleDestroy {
  private consumerClient: EventHubConsumerClient;
  private readonly consumerGroup = '$Default'; // Default consumer group
  private readonly eventHubName: string;
  private readonly connectionString: string;

  constructor(private configService: ConfigService) {
    this.connectionString = this.configService.get<string>(
      'EVENT_HUB_CONNECTION_STRING',
    );
    this.eventHubName = this.configService.get<string>('EVENT_HUB_NAME');

    if (!this.connectionString || !this.eventHubName) {
      throw new Error('Missing EVENT_HUB_CONNECTION_STRING or EVENT_HUB_NAME');
    }
  }

  async onModuleInit() {
    const options: EventHubConsumerClientOptions = {
      retryOptions: {
        maxRetries: 5,
        retryDelayInMs: 1000,
        timeoutInMs: 5000,
      },
    };

    this.consumerClient = new EventHubConsumerClient(
      this.consumerGroup,
      this.connectionString,
      this.eventHubName,
      options,
    );

    this.consumerClient.subscribe({
      processEvents: async (events, context) => {
        console.log('Partition ID:', context.partitionId);

        // Check if context.lastEnqueuedEventProperties exists
        if (context.lastEnqueuedEventProperties) {
          console.log(
            'Last Enqueued Time:',
            context.lastEnqueuedEventProperties.enqueuedOn,
          );
        } else {
          console.log('Last Enqueued Event Properties are not available.');
        }

        console.log('Event Count:', events.length);

        for (const event of events) {
          console.log('Received message:', event.body);
        }
      },
      processError: async (err: Error) => {
        console.error(`Error receiving event: ${err.message}`);
      },
    });
  }

  async onModuleDestroy() {
    await this.consumerClient.close();
  }
}
