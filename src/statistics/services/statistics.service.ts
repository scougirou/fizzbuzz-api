import { Injectable } from '@nestjs/common';
import { FizzbuzzDto } from '../../fizzbuzz/controllers/dto/fizzbuzz.dto';
import { MostUsedQueryDto } from '../controllers/dto/most-used-query.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class StatisticsService {
  protected stats = new Map<string, number>();

  async logUsage(input: FizzbuzzDto): Promise<void> {
    return new Promise((resolve): void => {
      const stringifiedInput = JSON.stringify(input);
      const currentCount = this.stats.get(stringifiedInput);
      if (!currentCount) {
        this.stats.set(stringifiedInput, 1);
      } else {
        this.stats.set(stringifiedInput, currentCount + 1);
      }
      resolve();
    });
  }

  getMostUsedQuery(): MostUsedQueryDto | undefined {
    let max = 0;
    let result = '';
    for (const [input, count] of this.stats) {
      if (count > max) {
        max = count;
        result = input;
      }
    }

    if (result) {
      const resultQuery = plainToClass(FizzbuzzDto, JSON.parse(result));

      return {
        query: resultQuery,
        count: max,
      };
    }

    return undefined;
  }
}
