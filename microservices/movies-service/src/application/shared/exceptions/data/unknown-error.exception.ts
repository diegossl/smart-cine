import { BaseException } from '../base.exception';

export class UnknownErrorException extends BaseException {
  constructor(message: string, status: number, context?: string, stack?: string, details?: any) {
    super(message, status, context, stack, details);
  }
}
