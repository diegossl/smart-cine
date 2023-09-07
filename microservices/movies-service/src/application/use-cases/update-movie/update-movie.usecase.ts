import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/data/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { IMovieRepository } from '@application/data/repository/movie.repository.interface';
import { NotificationError } from '@application/shared/domain/notification.error';
import { MovieFactory } from '@application/domain/models/movie/movie.factory';
import { UpdateMovieInput, UpdateMovieOutput } from './update-movie.dto';
import { IUseCase } from '@application/shared/use-cases/base.usecase';

export class UpdateMovieUseCase implements IUseCase<UpdateMovieInput, UpdateMovieOutput> {
  constructor(private readonly _movieRepository: IMovieRepository) {}

  async execute(params: UpdateMovieInput): Promise<UpdateMovieOutput> {
    try {
      const newMovie = MovieFactory.createFrom(params);
      const movie = await this._movieRepository.update(newMovie);
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
        distributors: movie.distributors,
      };
    } catch (error) {
      if (error instanceof NotificationError) {
        throw new BusinessLogicException('update-movie', error.stack, { params });
      } else if (error instanceof DatabaseAccessException) {
        throw new UnknownErrorException(error.message, error.code, error.context, error.stack, error.details);
      }
      throw error;
    }
  }
}
