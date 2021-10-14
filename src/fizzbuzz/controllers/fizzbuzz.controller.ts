import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FizzbuzzService } from '../services/fizzbuzz.service';
import { FizzbuzzDto } from './dto/fizzbuzz.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('fizzbuzz')
export class FizzbuzzController {
  constructor(private readonly fizzbuzzService: FizzbuzzService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Generates a fizzbuzz sequence based on 2 integers and their replacement strings.`,
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async fizzbuzz(@Query() input: FizzbuzzDto): Promise<string> {
    return this.fizzbuzzService.generateFizzbuzz(input);
  }
}
