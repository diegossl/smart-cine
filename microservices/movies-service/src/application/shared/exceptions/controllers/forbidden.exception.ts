import { BaseException } from '../base.exception';

export class ForbiddenException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('You do not have permission to access this resource.', 403, context, stack, details);
  }
}
