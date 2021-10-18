import { Test, TestingModule } from '@nestjs/testing';
import { StatCounter, StatisticsService } from './statistics.service';
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

  setStats(stats: Map<string, StatCounter>): void {
    this.stats = stats;
  }

  getStats(): Map<string, StatCounter> {
    return this.stats;
  }
}

const dummyDTO1: FizzbuzzDto = plainToClass(FizzbuzzDto, {
  integer1: 3,
  integer2: 5,
  limit: 10,
  replacement1: 'fizz',
  replacement2: 'buzz',
});
const dummyDTO2: FizzbuzzDto = plainToClass(FizzbuzzDto, {
  integer1: 0,
  integer2: 0,
  limit: 100,
  replacement1: 'foo',
  replacement2: 'bar',
});

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
    const lastUsed = new Date('2021-10-18T10:42:00.410Z');
    const stats = new Map<string, StatCounter>([
      [JSON.stringify(dummyDTO1), { count: 10, lastUsed }],
      [JSON.stringify(dummyDTO2), { count: 100, lastUsed }],
    ]);
    service.setStats(stats);
    const expectedResult: MostUsedQueryDto = {
      query: dummyDTO2,
      count: 100,
      lastUsed,
    };

    const result = service.getMostUsedQuery();

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return the an empty object of no stats', () => {
    const result = service.getMostUsedQuery();

    expect(result).toBeUndefined();
  });

  it('should add stats to the stat', async () => {
    await service.logUsage(dummyDTO1);

    expect(service.getStats()).toMatchSnapshot();
  });

  it('should should not log more than 10 stats', async () => {
    for (let i = 0; i < 15; i++) {
      const dto = Object.assign({}, dummyDTO1);
      dto.integer1 = i;
      await service.logUsage(dto);
    }

    expect(service.getStats()).toMatchSnapshot();
  });
});
