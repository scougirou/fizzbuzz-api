import { Test, TestingModule } from '@nestjs/testing';
import { FizzbuzzController } from './fizzbuzz.controller';
import { FizzbuzzService } from '../services/fizzbuzz.service';

describe('ControllerController', () => {
  let controller: FizzbuzzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FizzbuzzController],
      providers: [
        {
          provide: FizzbuzzService,
          useValue: {
            generateFizzbuzz: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FizzbuzzController>(FizzbuzzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
