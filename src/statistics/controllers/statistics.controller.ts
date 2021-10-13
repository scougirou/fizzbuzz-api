import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { StatisticsService } from '../services/statistics.service';
import { MostUsedQueryDto } from './dto/most-used-query.dto';
import { Response } from 'express';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statsService: StatisticsService) {}

  @Get()
  getMostUsedQuery(
    @Res({ passthrough: true }) res: Response,
  ): MostUsedQueryDto | void {
    const result = this.statsService.getMostUsedQuery();

    // Send a 204 "No content" if no stats are available
    if (!result) {
      res.status(HttpStatus.NO_CONTENT);

      return;
    }

    return result;
  }
}
