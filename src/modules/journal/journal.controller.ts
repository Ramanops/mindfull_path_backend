import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Controller('journal')
export class JournalController {
  constructor(private prisma: PrismaService) {}

  @Post()
  create(@Req() req, @Body() body) {
    return this.prisma.journalEntry.create({
      data: {
        userId: req.user.id,
        content: body.content,
        moodTag: body.moodTag,
      },
    });
  }

  @Get()
  list(@Req() req) {
    return this.prisma.journalEntry.findMany({
      where: { userId: req.user.id },
    });
  }
}