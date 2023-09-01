import { BaseException } from '../base.exception';

export class ExternalServiceException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('An error occurred while trying to communicate with an external service.', 500, context, stack, details);
  }
}
