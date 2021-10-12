import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { MostUsedQueryDto } from '../controllers/dto/most-used-query.dto';
import { FizzbuzzDto } from '../../fizzbuzz/controllers/dto/fizzbuzz.dto';
import { plainToClass } from 'class-transformer';

/**
 * Wrapper around the stat service for testing purpose.
 * Expose private members/methods that would not be otherwise accessible from Jest.
 */
class StatisticsServiceWrapper extends StatisticsService {
  constructor() {
    super();
  }
  async logUsage(input: FizzbuzzDto): Promise<void> {
    return super.logUsage(input);
  }

  getMostUsedQuery(): MostUsedQueryDto {
    return super.getMostUsedQuery();
  }

  setStats(stats: Map<string, number>): void {
    this.stats = stats;
  }
}

describe('StatisticsService', () => {
  let service: StatisticsServiceWrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatisticsServiceWrapper],
    }).compile();

    service = module.get<StatisticsServiceWrapper>(StatisticsServiceWrapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the most used query', () => {
    const query1: FizzbuzzDto = plainToClass(FizzbuzzDto, {
      integer1: 3,
      integer2: 5,
      limit: 10,
      replacement1: 'fizz',
      replacement2: 'buzz',
    });
    const query2: FizzbuzzDto = plainToClass(FizzbuzzDto, {
      integer1: 0,
      integer2: 0,
      limit: 100,
      replacement1: 'foo',
      replacement2: 'bar',
    });
    const stats = new Map<string, number>([
      [JSON.stringify(query1), 10],
      [JSON.stringify(query2), 100],
    ]);
    service.setStats(stats);
    const expectedResult: MostUsedQueryDto = {
      query: query2,
      count: 100,
    };

    const result = service.getMostUsedQuery();

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return the an empty object of no stats', () => {
    const result = service.getMostUsedQuery();

    expect(result).toBeUndefined();
  });
});
