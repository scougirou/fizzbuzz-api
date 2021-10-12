import { Module } from '@nestjs/common';
import { FizzbuzzController } from './fizzbuzz/controllers/fizzbuzz.controller';
import { StatisticsService } from './statistics/services/statistics.service';
import { StatisticsController } from './statistics/controllers/statistics.controller';
import { FizzbuzzService } from './fizzbuzz/services/fizzbuzz.service';

@Module({
  imports: [],
  controllers: [FizzbuzzController, StatisticsController],
  providers: [FizzbuzzService, StatisticsService],
})
export class AppModule {}
