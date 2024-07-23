import { Controller, Post, Body } from '@nestjs/common';
import { EventSenderService } from './event-sender.service';

@Controller('event-sender')
export class EventSenderController {
  constructor(private readonly eventService: EventSenderService) {}

  @Post('send')
  async sendMessage(@Body('message') message: string): Promise<void> {
    await this.eventService.sendMessage(message);
  }
}
