import { Notification } from './notification';

export abstract class Entity {
  private _id: string;

  public readonly errorBus: Notification;

  protected abstract validate(): void;

  constructor(id: string) {
    this._id = id;
    this.errorBus = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
