import { BaseException } from '../base.exception';

export class UnauthorizedException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('You are not authorized to access this resource.', 401, context, stack, details);
  }
}
