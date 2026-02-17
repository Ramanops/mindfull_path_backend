import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { JournalModule } from './modules/journal/journal.module';
import { MoodModule } from './modules/mood/mood.module';
import { StreakModule } from './modules/streak/streak.module';

@Module({
  imports: [AuthModule, JournalModule, MoodModule, StreakModule],
})
export class AppModule {}
