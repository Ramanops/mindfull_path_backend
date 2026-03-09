import { Controller, Get, Query, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  async getSummary(
    @Req() req: any,
    @Query('days') days: string = '7',
  ) {
    return this.analyticsService.getSummary(req.user.id, Number(days));
  }
}