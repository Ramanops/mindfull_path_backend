import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(
    @Body('message') message: string,
    @Body('userName') userName: string,
  ) {
    if (!message) {
      throw new BadRequestException('Message is required');
    }

    const reply = await this.chatService.getResponse(
      message,
      userName || 'User',
    );

    return { reply };
  }
}