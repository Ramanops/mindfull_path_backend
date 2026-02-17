import { Module } from '@nestjs/common';
import { MoodController } from './mood.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [MoodController],
  providers: [PrismaService],
})
export class MoodModule {}
