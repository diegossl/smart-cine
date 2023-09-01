import { BaseException } from '../base.exception';

export class BadRequestException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('The request sent by the client is invalid or missing required parameters.', 400, context, stack, details);
  }
}
