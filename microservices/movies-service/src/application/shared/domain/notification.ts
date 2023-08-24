export type NotificationErrorData = {
  message: string;
  field: string | undefined;
  context: string;
};

export class Notification {
  private errors: Array<NotificationErrorData> = [];

  addError(error: NotificationErrorData) {
    this.errors.push(error);
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  hasErrorsFor(field: string): boolean {
    return this.errors.some((error) => error.field === field);
  }

  getErrors(): NotificationErrorData[] {
    return this.errors;
  }

  getErrorsFor(field: string): NotificationErrorData[] {
    return this.errors.filter((error) => error.field === field);
  }
}
