import { FizzbuzzDto } from '../../../fizzbuzz/controllers/dto/fizzbuzz.dto';
import { IsDate, IsOptional, IsPositive } from 'class-validator';

export class MostUsedQueryDto {
  @IsOptional()
  query: FizzbuzzDto;
  @IsPositive()
  count: number;
  @IsDate()
  lastUsed: Date;
}
