import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Controller('moods')
export class MoodController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Req() req, @Body() body) {
    return this.prisma.moodEntry.create({
      data: {
        userId: req.user.id,
        moodType: body.moodType,
        intensity: body.intensity,
        note: body.note,
      },
    });
  }

  @Get('history')
  async history(@Req() req) {
    return this.prisma.moodEntry.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
  }
}