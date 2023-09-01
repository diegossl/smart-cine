import { Movie } from '@application/domain/models/movie/movie.entity';
import { IMovieRepository } from './movie.repository.interface';

export class MovieRepository implements IMovieRepository {
  async getAll(): Promise<Movie[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<Movie> {
    throw new Error('Method not implemented.');
  }

  async create(item: Movie): Promise<Movie> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, item: Movie): Promise<Movie> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
