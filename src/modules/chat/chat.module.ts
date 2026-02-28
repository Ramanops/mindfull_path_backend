import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, PrismaService],
})
export class ChatModule {}