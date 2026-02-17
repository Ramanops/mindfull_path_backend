import { Module } from '@nestjs/common';
import { StreakService } from './streak.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [StreakService, PrismaService],
})
export class StreakModule {}
