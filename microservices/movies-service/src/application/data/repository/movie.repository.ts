import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { Movie } from '@application/domain/models/movie/movie.entity';
import { IMovieRepository } from './movie.repository.interface';
import { IMovieDataSource } from '../dao/movie.dao.interface';

export class MovieRepository implements IMovieRepository {
  constructor(private readonly _movieDataSource: IMovieDataSource) {}

  async getAll(): Promise<Movie[]> {
    try {
      return await this._movieDataSource.getAll();
    } catch (error) {
      const { message, code, context, stack } = error as DatabaseAccessException;
      throw new DatabaseAccessException(message, code, context, stack);
    }
  }

  async getById(id: string): Promise<Movie> {
    try {
      return await this._movieDataSource.getById(id);
    } catch (error) {
      const { message, code, context, stack } = error as DatabaseAccessException;
      throw new DatabaseAccessException(message, code, context, stack);
    }
  }

  async create(item: Movie): Promise<Movie> {
    try {
      return await this._movieDataSource.create(item);
    } catch (error) {
      const { message, code, context, stack } = error as DatabaseAccessException;
      throw new DatabaseAccessException(message, code, context, stack);
    }
  }

  async update(item: Movie): Promise<Movie> {
    try {
      return await this._movieDataSource.update(item);
    } catch (error) {
      const { message, code, context, stack } = error as DatabaseAccessException;
      throw new DatabaseAccessException(message, code, context, stack);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this._movieDataSource.delete(id);
    } catch (error) {
      const { message, code, context, stack } = error as DatabaseAccessException;
      throw new DatabaseAccessException(message, code, context, stack);
    }
  }
}
