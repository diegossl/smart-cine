import { BaseException } from '../base.exception';

export class DatabaseAccessException extends BaseException {
  constructor(context?: string, stack?: string, details?: any) {
    super('An error occurred while accessing the database.', 500, context, stack, details);
  }
}
