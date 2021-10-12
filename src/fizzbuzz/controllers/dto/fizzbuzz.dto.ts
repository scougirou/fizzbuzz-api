import { IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const MAXIMUM_LIMIT = 1000;
export const DEFAULT_LIMIT = 100;
export const MINIMUM_INTEGER = 0;
export const DEFAULT_INTEGER = 0;

export class FizzbuzzDto {
  @ApiPropertyOptional({
    description: 'First number to replace',
    minimum: MINIMUM_INTEGER,
    default: DEFAULT_INTEGER,
    example: 3,
  })
  @IsPositive()
  integer1: number;

  @ApiPropertyOptional({
    description: 'Second number to replace',
    minimum: MINIMUM_INTEGER,
    default: DEFAULT_INTEGER,
    example: 5,
  })
  @IsPositive()
  integer2: number;

  @ApiPropertyOptional({
    description:
      'Upper limit of the sequence count. The sequence will always start at 1.',
    minimum: MINIMUM_INTEGER,
    maximum: MAXIMUM_LIMIT,
    default: DEFAULT_LIMIT,
    example: 10,
  })
  @IsPositive()
  limit: number;

  @ApiPropertyOptional({
    description: 'First replacement string',
    example: 'fizz',
    default: 'empty string',
  })
  replacement1: string;

  @ApiPropertyOptional({
    description: 'Second replacement string',
    example: 'buzz',
    default: 'empty string',
  })
  replacement2: string;
}
