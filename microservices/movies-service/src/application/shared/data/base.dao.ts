export interface IBaseDataSource<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: string): Promise<void>;
}
