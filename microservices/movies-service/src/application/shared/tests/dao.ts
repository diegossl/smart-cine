import { IMovieDao } from '@application/data/dao/movie.dao.interface';

export class TestDAOUtils {
  static get movieDAO(): IMovieDao {
    return {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  }
}
