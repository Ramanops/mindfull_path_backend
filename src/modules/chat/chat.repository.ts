import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ChatRole } from '@prisma/client';

@Injectable()
export class ChatRepository {
  constructor(private prisma: PrismaService) {}

  async saveMessage(
    userId: string,
    role: ChatRole,
    content: string,
  ) {
    return this.prisma.chatMessage.create({
      data: {
        userId,
        role,
        content,
      },
    });
  }

  async getRecentMessages(userId: string, limit = 10) {
    return this.prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}