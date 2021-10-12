import { Test, TestingModule } from '@nestjs/testing';
import { FizzbuzzService } from './fizzbuzz.service';
import { FizzbuzzDto } from '../controllers/dto/fizzbuzz.dto';

describe('ServicesService', () => {
  let service: FizzbuzzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FizzbuzzService],
    }).compile();

    service = module.get<FizzbuzzService>(FizzbuzzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should replace values for the classic input', () => {
    const input: FizzbuzzDto = {
      integer1: 3,
      integer2: 5,
      limit: 15,
      replacement1: 'fizz',
      replacement2: 'buzz',
    };
    const expectedResult =
      '1,2,fizz,4,buzz,fizz,7,8,fizz,buzz,11,fizz,13,14,fizzbuzz';

    const result = service.generateFizzbuzz(input);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should replace values for a different input', () => {
    const input: FizzbuzzDto = {
      integer1: 2,
      integer2: 3,
      limit: 10,
      replacement1: 'foo',
      replacement2: 'bar',
    };
    const expectedResult = '1,foo,bar,foo,5,foobar,7,foo,bar,foo';

    const result = service.generateFizzbuzz(input);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should work return the list of numbers to limit with 0 as replacement integers', () => {
    const input: FizzbuzzDto = {
      integer1: 0,
      integer2: 0,
      limit: 10,
      replacement1: 'null',
      replacement2: 'nil',
    };
    const expectedResult = '1,2,3,4,5,6,7,8,9,10';

    const result = service.generateFizzbuzz(input);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should work with empty values', () => {
    const input = {};
    const expectedResult =
      '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100';

    const result = service.generateFizzbuzz(input as unknown as FizzbuzzDto);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should work with bad value types', () => {
    const input = {
      integer1: -5,
      integer2: -2.5,
      limit: 999999999,
      replacement1: new Date(),
      replacement2: false,
    };
    const expectedResult =
      '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100';

    const result = service.generateFizzbuzz(input as unknown as FizzbuzzDto);

    expect(result).toStrictEqual(expectedResult);
  });
});
