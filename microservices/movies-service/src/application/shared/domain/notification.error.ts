import { NotificationErrorData } from './notification';

export class NotificationError extends Error {
  constructor(readonly errors: NotificationErrorData[]) {
    super();
  }
}
