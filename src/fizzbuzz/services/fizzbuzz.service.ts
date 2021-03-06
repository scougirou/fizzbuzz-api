import { Injectable } from '@nestjs/common';
import { FizzbuzzDto } from '../controllers/dto/fizzbuzz.dto';
import { StatisticsService } from '../../statistics/services/statistics.service';
import {
  DEFAULT_INTEGER_1,
  DEFAULT_INTEGER_2,
  DEFAULT_LIMIT,
  DEFAULT_REPLACEMENT_1,
  DEFAULT_REPLACEMENT_2,
  MAXIMUM_LIMIT,
  MINIMUM_INTEGER,
} from '../../config/config';

interface MultiplierInterface {
  multiplierInteger: number;
  multiplierReplacement: string;
}

@Injectable()
export class FizzbuzzService {
  constructor(private readonly statsService: StatisticsService) {}

  generateFizzbuzz(input2: FizzbuzzDto): string {
    let result = '';
    const input = this.validateInput(input2);

    // Log the input in the stat service
    // The returned promise is deliberately ignored: do not block the main computation
    // for logging purposes
    this.statsService.logUsage(input);

    // Prepare a multiplier object, avoid computing it in each loop iteration
    const multiplier: MultiplierInterface = {
      multiplierInteger: input.integer1 * input.integer2,
      multiplierReplacement: input.replacement1 + input.replacement2,
    };

    // Main loop
    for (let i = 1; i < input.limit + 1; i++) {
      const value = this.generateValue(i, input, multiplier);
      result = this.appendValue(i, result, value);
    }

    return result;
  }

  /**
   * validateInput will normalize the input
   * and replace any parameter the would break the computation by it's default value.
   * @param input
   * @private
   */
  private validateInput(input: FizzbuzzDto): FizzbuzzDto {
    const validatedInput: FizzbuzzDto = input;
    if (!input.integer1 || input.integer1 < MINIMUM_INTEGER) {
      validatedInput.integer1 = DEFAULT_INTEGER_1;
    }
    if (!input.integer2 || input.integer2 < MINIMUM_INTEGER) {
      validatedInput.integer2 = DEFAULT_INTEGER_2;
    }
    if (
      !input.limit ||
      input.limit < MINIMUM_INTEGER ||
      input.limit > MAXIMUM_LIMIT
    ) {
      validatedInput.limit = DEFAULT_LIMIT;
    }
    if (!input.replacement1) {
      validatedInput.replacement1 = DEFAULT_REPLACEMENT_1;
    }
    if (!input.replacement2) {
      validatedInput.replacement2 = DEFAULT_REPLACEMENT_2;
    }
    return validatedInput;
  }

  private generateValue(
    index: number,
    input: FizzbuzzDto,
    multiplier: MultiplierInterface,
  ): string {
    const { integer1, integer2, replacement1, replacement2 } = input;
    const { multiplierInteger, multiplierReplacement } = multiplier;
    let value = '';

    if (index % multiplierInteger === 0) {
      value = multiplierReplacement;
    } else if (index % integer2 === 0) {
      value = replacement2;
    } else if (index % integer1 === 0) {
      value = replacement1;
    } else {
      value = '' + index;
    }

    return value;
  }

  private appendValue(
    index: number,
    previousString: string,
    currentValue: string,
  ): string {
    let result = '';

    if (index === 1) {
      result = currentValue;
    } else {
      result = previousString + ',' + currentValue;
    }

    return result;
  }
}
