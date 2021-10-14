import { Injectable } from '@nestjs/common';
import { FizzbuzzDto } from '../../fizzbuzz/controllers/dto/fizzbuzz.dto';
import { MostUsedQueryDto } from '../controllers/dto/most-used-query.dto';
import { plainToClass } from 'class-transformer';
import { MAX_STAT_COUNT } from '../../config/config';

export interface StatCounter {
  count: number;
  lastUsed: Date;
}

@Injectable()
export class StatisticsService {
  protected stats = new Map<string, StatCounter>();

  getMostUsedQuery(): MostUsedQueryDto | undefined {
    let max = 0;
    let result = '';
    let lastUsed: Date;
    for (const [input, counter] of this.stats) {
      if (counter.count > max) {
        max = counter.count;
        lastUsed = counter.lastUsed;
        result = input;
      }
    }

    if (result) {
      const resultQuery = plainToClass(FizzbuzzDto, JSON.parse(result));

      return {
        query: resultQuery,
        count: max,
        lastUsed: lastUsed,
      };
    }

    return undefined;
  }

  async logUsage(input: FizzbuzzDto): Promise<void> {
    return new Promise((resolve): void => {
      if (this.isStatsAtMaxCapacity()) {
        this.deleteOldestStat();
      }

      this.addStat(input);
      resolve();
    });
  }

  private isStatsAtMaxCapacity(): boolean {
    return this.stats.size > MAX_STAT_COUNT;
  }

  private deleteOldestStat(): void {
    // Simply init the max date to now, passed stats cannot come from the future
    let min = new Date();
    let result = '';
    for (const [input, counter] of this.stats) {
      if (counter.lastUsed < min) {
        min = counter.lastUsed;
        result = input;
      }
    }
    this.stats.delete(result);
  }

  private addStat(input: FizzbuzzDto): void {
    const stringifiedInput = JSON.stringify(input);
    const currentCount = this.stats.get(stringifiedInput);
    const lastUsed = new Date();
    if (!currentCount) {
      this.stats.set(stringifiedInput, {
        count: 1,
        lastUsed,
      });
    } else {
      this.stats.set(stringifiedInput, {
        count: currentCount.count + 1,
        lastUsed,
      });
    }
  }
}
