import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [JournalController],
  providers: [PrismaService],
})
export class JournalModule {}
