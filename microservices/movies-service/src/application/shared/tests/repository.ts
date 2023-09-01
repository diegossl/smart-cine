import { IMovieRepository } from '@application/data/repository/movie.repository.interface';

export class TestRepositoryUtils {
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
