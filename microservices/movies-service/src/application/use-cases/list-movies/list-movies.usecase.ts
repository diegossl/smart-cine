import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/data/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { IMovieRepository } from '@application/data/repository/movie.repository.interface';
import { NotificationError } from '@application/shared/domain/notification.error';
import { IUseCase } from '@application/shared/use-cases/base.usecase';
import { ListMoviesInput, ListMoviesOutput } from './list-movies.dto';

export class ListMoviesUseCase implements IUseCase<ListMoviesInput, ListMoviesOutput> {
  constructor(private readonly _movieRepository: IMovieRepository) {}

  async execute(params: ListMoviesInput): Promise<ListMoviesOutput> {
    try {
      const limit = params.limit || 10;
      const offset = params.offset || 0;
      return await this._movieRepository.getAll(limit, offset);
    } catch (error) {
      if (error instanceof NotificationError) {
        throw new BusinessLogicException('use-case/list-movies', error.stack, { params });
      } else if (error instanceof DatabaseAccessException) {
        throw new UnknownErrorException(error.message, error.code, error.context, error.stack, error.details);
      }
      throw error;
    }
  }
}
