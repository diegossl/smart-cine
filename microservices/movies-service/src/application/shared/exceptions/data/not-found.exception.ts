import { BaseException } from '../base.exception';

export class EntityNotFoundException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('The requested entity was not found in the system.', 404, context, stack, details);
  }
}
