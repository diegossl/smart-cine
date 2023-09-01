import { BaseException } from '../base.exception';

export class ResourceNotFoundException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('The requested resource was not found.', 404, context, stack, details);
  }
}
