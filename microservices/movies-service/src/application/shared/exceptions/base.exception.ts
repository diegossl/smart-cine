export class BaseException extends Error {
  public code: number;
  public details?: any;
  public context?: string;
  public timestamp: Date;
  public stack?: string;

  constructor(message: string, code: number, context?: string, stack?: string, details?: any) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.details = details || {};
    this.context = context || '';
    this.timestamp = new Date();
    this.stack = stack || '';

    this.print();
  }

  public toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
      context: this.context,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
    };
  }

  public toString() {
    return JSON.stringify(this.toJSON());
  }

  public print() {
    console.error(this.toJSON());
  }
}
