import { BaseException } from '../base.exception';

export class InternalServerErrorException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('An internal error occurred on the server.', 500, context, stack, details);
  }
}
