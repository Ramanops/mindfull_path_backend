import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class StreakService {
  constructor(private prisma: PrismaService) {}

  async updateStreak(userId: string) {
    const today = new Date();
    const streak = await this.prisma.streak.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const last = streak.lastActivityDate;
    const diff = last ? Math.floor((+today - +last) / 86400000) : 0;

    let current = streak.currentStreak;
    if (diff === 1) current++;
    else if (diff > 1) current = 1;

    return this.prisma.streak.update({
      where: { userId },
      data: {
        currentStreak: current,
        longestStreak: Math.max(current, streak.longestStreak),
        lastActivityDate: today,
      },
    });
  }
}