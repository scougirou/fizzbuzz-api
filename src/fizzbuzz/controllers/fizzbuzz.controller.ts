import { Controller, Get } from '@nestjs/common';
import { FizzbuzzService } from '../services/fizzbuzz.service';

@Controller('fizzbuzz')
export class FizzbuzzController {
  constructor(private readonly fizzbuzzService: FizzbuzzService) {}

  @Get()
  fizzbuzz(): string {
    return 'it works';
  }
}
