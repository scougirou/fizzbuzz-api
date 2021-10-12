import { FizzbuzzDto } from '../../../fizzbuzz/controllers/dto/fizzbuzz.dto';
import { IsOptional, IsPositive } from 'class-validator';

export class MostUsedQueryDto {
  @IsOptional()
  query: FizzbuzzDto;
  @IsPositive()
  count: number;
}
