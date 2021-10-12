import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FizzbuzzController } from './fizzbuzz/controllers/fizzbuzz.controller';
import { StatisticsService } from './statistics/services/statistics.service';
import { StatisticsController } from './statistics/controllers/statistics.controller';
import { FizzbuzzService } from './fizzbuzz/services/fizzbuzz.service';

@Module({
  imports: [],
  controllers: [AppController, FizzbuzzController, StatisticsController],
  providers: [AppService, FizzbuzzService, StatisticsService],
})
export class AppModule {}
