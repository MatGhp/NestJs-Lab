import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { EventSenderService } from './event-sender.service';
import { ResponseTransformInterceptor } from '@app/common';

@Controller('event-sender')
@UseInterceptors(ResponseTransformInterceptor)
export class EventSenderController {
  constructor(private readonly eventService: EventSenderService) {}

  @Post('send')
  async sendMessage(@Body('message') message: string): Promise<void> {
    await this.eventService.sendMessage(message);
  }
}
