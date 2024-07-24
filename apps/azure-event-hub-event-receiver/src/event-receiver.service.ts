import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EventHubConsumerClient,
  EventHubConsumerClientOptions,
  ReceivedEventData,
} from '@azure/event-hubs';

@Injectable()
export class EventReceiverService implements OnModuleInit, OnModuleDestroy {
  private consumerClientDefault: EventHubConsumerClient;
  private consumerClientJob1: EventHubConsumerClient;
  private readonly consumerGroupDefault = '$Default'; // Default consumer group
  private readonly consumerGroup1 = 'job1'; // consumer group 1
  private readonly eventHubName: string;
  private readonly connectionString: string;

  constructor(private configService: ConfigService) {
    this.connectionString = this.configService.get<string>(
      'EVENT_HUB_CONNECTION_STRING',
    );
    console.log('EVENT_HUB_CONNECTION_STRING: ', this.connectionString);

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

    this.consumerClientDefault = new EventHubConsumerClient(
      this.consumerGroupDefault,
      this.connectionString,
      this.eventHubName,
      options,
    );

    this.consumerClientJob1 = new EventHubConsumerClient(
      this.consumerGroup1,
      this.connectionString,
      this.eventHubName,
      options,
    );

    this.subscribeToConsumerClient(
      this.consumerClientDefault,
      'Default Consumer Group',
    );
    this.subscribeToConsumerClient(
      this.consumerClientJob1,
      'Job1 Consumer Group',
    );
  }

  private subscribeToConsumerClient(
    client: EventHubConsumerClient,
    consumerGroupName: string,
  ) {
    client.subscribe({
      processEvents: async (events, context) => {
        await this.handleEventProcessing(events, context, consumerGroupName);
      },
      processError: async (err: Error) => {
        await this.handleError(err, consumerGroupName);
      },
    });
  }

  private async handleEventProcessing(
    events: ReceivedEventData[],
    context: any,
    consumerGroupName: string,
  ) {
    console.log(
      `Partition ID: ${context.partitionId} - Consumer Group: ${consumerGroupName}`,
    );

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
  }

  private async handleError(err: Error, consumerGroupName: string) {
    console.error(
      `Error receiving event for ${consumerGroupName}: ${err.message}`,
    );
  }

  async onModuleDestroy() {
    await this.consumerClientDefault.close();
    await this.consumerClientJob1.close();
  }
}
