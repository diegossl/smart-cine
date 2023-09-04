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
      const dataSourceError = error as DatabaseAccessException;
      throw new DatabaseAccessException(
        dataSourceError.message,
        dataSourceError.code,
        dataSourceError.context,
        dataSourceError.stack,
        dataSourceError.details,
      );
    }
  }

  async getById(id: string): Promise<Movie> {
    try {
      return await this._movieDataSource.getById(id);
    } catch (error) {
      const dataSourceError = error as DatabaseAccessException;
      throw new DatabaseAccessException(
        dataSourceError.message,
        dataSourceError.code,
        dataSourceError.context,
        dataSourceError.stack,
        dataSourceError.details,
      );
    }
  }

  async create(item: Movie): Promise<Movie> {
    try {
      return await this._movieDataSource.create(item);
    } catch (error) {
      const dataSourceError = error as DatabaseAccessException;
      throw new DatabaseAccessException(
        dataSourceError.message,
        dataSourceError.code,
        dataSourceError.context,
        dataSourceError.stack,
        dataSourceError.details,
      );
    }
  }

  async update(item: Movie): Promise<Movie> {
    try {
      return await this._movieDataSource.update(item);
    } catch (error) {
      const dataSourceError = error as DatabaseAccessException;
      throw new DatabaseAccessException(
        dataSourceError.message,
        dataSourceError.code,
        dataSourceError.context,
        dataSourceError.stack,
        dataSourceError.details,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this._movieDataSource.delete(id);
    } catch (error) {
      const dataSourceError = error as DatabaseAccessException;
      throw new DatabaseAccessException(
        dataSourceError.message,
        dataSourceError.code,
        dataSourceError.context,
        dataSourceError.stack,
        dataSourceError.details,
      );
    }
  }
}
