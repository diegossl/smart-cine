import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { MovieFactory } from '@application/domain/models/movie/movie.factory';
import { MovieModel } from '@infrastructure/mongodb/schemas/movie.schema';
import { MongoService } from '@infrastructure/mongodb/mongodb.service';
import { Movie } from '@application/domain/models/movie/movie.entity';
import { IMovieDataSource } from './movie.dao.interface';

export class MovieDataSource extends MongoService<Movie> implements IMovieDataSource {
  constructor() {
    super(MovieModel);
  }

  async getAll(): Promise<Movie[]> {
    try {
      const movies = await this.find({});
      return movies.map((movie) => MovieFactory.createFrom(movie));
    } catch (error) {
      const { message, name, stack, statusCode } = error as any;
      const code = statusCode || 500;
      throw new DatabaseAccessException(message, code, name, stack);
    }
  }

  async getById(id: string): Promise<Movie> {
    try {
      const movie = await this.findById(id);
      return MovieFactory.createFrom(movie);
    } catch (error) {
      const { message, name, stack, statusCode } = error as any;
      const code = statusCode || 500;
      throw new DatabaseAccessException(message, code, name, stack);
    }
  }

  async create(movie: Movie): Promise<Movie> {
    try {
      const newMovie = await this.create(movie);
      return MovieFactory.createFrom(newMovie);
    } catch (error) {
      const { message, name, stack, statusCode } = error as any;
      const code = statusCode || 500;
      throw new DatabaseAccessException(message, code, name, stack);
    }
  }

  async update(movie: Movie): Promise<Movie> {
    try {
      const movieUpdated = await this.findOneAndUpdate({ _id: movie.id }, { ...movie }, { new: true });
      return MovieFactory.createFrom({ ...movieUpdated });
    } catch (error) {
      const { message, name, stack, statusCode } = error as any;
      const code = statusCode || 500;
      throw new DatabaseAccessException(message, code, name, stack);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.deleteOne({ _id: id });
    } catch (error) {
      const { message, name, stack, statusCode } = error as any;
      const code = statusCode || 500;
      throw new DatabaseAccessException(message, code, name, stack);
    }
  }
}
