import { Notification } from './notification';

export abstract class Entity {
  private _id: string | undefined;

  public readonly errorBus: Notification;

  protected abstract validate(): void;

  constructor(id: string | undefined) {
    this._id = id;
    this.errorBus = new Notification();
  }

  get id(): string | undefined {
    return this._id;
  }
}
