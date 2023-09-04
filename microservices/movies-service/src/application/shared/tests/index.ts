import { IMovieRepository } from '@application/data/repository/movie.repository.interface';
import { IMovieDataSource } from '@application/data/dao/movie.dao.interface';

export class TestUtils {
  static get movieDAO(): IMovieDataSource {
    return {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  }

  static get movieRepository(): IMovieRepository {
    return {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  }
}
