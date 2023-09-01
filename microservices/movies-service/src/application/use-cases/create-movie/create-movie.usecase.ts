import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/use-cases/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { IMovieRepository } from '@application/data/repository/movie.repository.interface';
import { NotificationError } from '@application/shared/domain/notification.error';
import { MovieFactory } from '@application/domain/models/movie/movie.factory';
import { CreateMovieInput, CreateMovieOutput } from './create-movie.dto';
import { IUseCase } from '@application/shared/use-cases/base.usecase';

export class CreateMovieUseCase implements IUseCase<CreateMovieInput, CreateMovieOutput> {
  constructor(private readonly _movieRepository: IMovieRepository) {}

  async execute(params: CreateMovieInput): Promise<CreateMovieOutput> {
    try {
      const newMovie = MovieFactory.create(params);
      const movie = await this._movieRepository.create(newMovie);
      await this._movieRepository.create(newMovie);
      return {
        id: movie.id,
        title: movie.title,
        synopsis: movie.synopsis,
        year: movie.year,
        duration: movie.duration,
        directors: movie.directors,
        actors: movie.actors,
        cover: movie.cover,
        release: movie.release,
        categories: movie.categories,
        classification: movie.classification,
        trailers: movie.trailers,
        keywords: movie.keywords,
      };
    } catch (error) {
      if (error instanceof NotificationError) {
        throw new BusinessLogicException('use-case/create-movie', error.stack, { params });
      } else if (error instanceof DatabaseAccessException) {
        throw new UnknownErrorException('use-case/create-movie', error.stack);
      }
      throw error;
    }
  }
}
