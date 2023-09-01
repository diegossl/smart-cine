import { BaseException } from '../base.exception';

export class TooManyRequestsException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('The client has sent too many requests in a short period of time.', 429, context, stack, details);
  }
}
