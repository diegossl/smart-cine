import { FilterQuery, InsertManyOptions, Model, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';

/** This class is used to centralize the common methods used managed objects into mongoDB */
export abstract class MongoService<T> {
  private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(doc: T): Promise<any> {
    return this._model.create(doc);
  }

  async insertMany(docs: Array<T>, options?: InsertManyOptions) {
    return options ? this._model.insertMany(docs, options) : this._model.insertMany(docs);
  }

  async updateOne(filter: FilterQuery<T>, update?: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions) {
    return this._model.updateOne(filter, update, options);
  }

  async updateMany(filter: FilterQuery<T>, update: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions): Promise<any> {
    return this._model.updateMany(filter, update, options);
  }

  async deleteOne(filter: FilterQuery<T>, options?: QueryOptions) {
    return this._model.deleteOne(filter, options);
  }

  async deleteMany(filter: FilterQuery<T>, options?: QueryOptions): Promise<any> {
    return this._model.deleteMany(filter, options);
  }

  async findById(id: any, projection?: any | null, options?: QueryOptions | null): Promise<any> {
    const item = await this._model.findById(id, projection, options).exec();
    if (item === null || item === undefined) {
      return null;
    }
    return item.toObject() as any;
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions | null,
  ): Promise<any> {
    const item = await this._model.findOneAndUpdate(filter, update, options).exec();
    if (item === null || item === undefined) {
      return null;
    }
    return item.toObject() as any;
  }

  async findOne(filter: FilterQuery<T>, projection?: any | null, options?: QueryOptions | null): Promise<any> {
    const item = await this._model.findOne(filter, projection, options).exec();
    if (item === null || item === undefined) {
      return null;
    }
    return item.toObject() as any;
  }

  async find(filter: FilterQuery<T>, projection?: any | null, options?: QueryOptions | null): Promise<any[]> {
    const items = await this._model.find(filter, projection, options).lean();
    if (items === null || items === undefined) {
      return [];
    }
    return items as any[];
  }

  async save(doc: T, isNew = false): Promise<any> {
    const model = new this.model(doc);
    model.isNew = isNew;
    return model.save();
  }

  set model(model: any) {
    this._model = model;
  }

  get model() {
    return this._model;
  }
}
