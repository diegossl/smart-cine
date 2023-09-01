import { BaseException } from '../base.exception';

export class InvalidInputException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('The input data is not valid for this operation.', 400, context, stack, details);
  }
}
