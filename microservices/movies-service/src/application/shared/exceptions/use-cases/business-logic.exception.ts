import { BaseException } from '../base.exception';

export class BusinessLogicException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('An error occurred in the business logic while processing your request.', 500, context, stack, details);
  }
}
