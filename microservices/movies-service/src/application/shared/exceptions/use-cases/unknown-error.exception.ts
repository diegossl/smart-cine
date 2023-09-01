import { BaseException } from '../base.exception';

export class UnknownErrorException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('An unknown error has occurred.', 500, context, stack, details);
  }
}
