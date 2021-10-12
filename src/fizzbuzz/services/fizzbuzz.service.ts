import { Injectable } from '@nestjs/common';

export interface FizzbuzzDto {
  integer1: number;
  integer2: number;
  limit: number;
  replacement1: string;
  replacement2: string;
}

interface MultiplierInterface {
  multiplierInteger: number;
  multiplierReplacement: string;
}

@Injectable()
export class FizzbuzzService {
  generateFizzbuzz(input2: FizzbuzzDto): string {
    let result = '';
    const input = this.validateInput(input2);

    const multiplier: MultiplierInterface = {
      multiplierInteger: input.integer1 * input.integer2,
      multiplierReplacement: input.replacement1 + input.replacement2,
    };

    for (let i = 1; i < input.limit + 1; i++) {
      const value = this.generateValue(i, input, multiplier);
      result = this.appendValue(i, result, value);
    }

    return result;
  }

  private validateInput(input: FizzbuzzDto): FizzbuzzDto {
    const validatedInput: FizzbuzzDto = input;
    if (!input.integer1) {
      validatedInput.integer1 = 0;
    }
    if (!input.integer2) {
      validatedInput.integer2 = 0;
    }
    if (!input.limit) {
      validatedInput.limit = 100;
    }
    if (!input.replacement1) {
      validatedInput.replacement1 = '';
    }
    if (!input.replacement2) {
      validatedInput.replacement2 = '';
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
