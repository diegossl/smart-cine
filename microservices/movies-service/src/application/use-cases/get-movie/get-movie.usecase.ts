import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/data/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { IMovieRepository } from '@application/data/repository/movie.repository.interface';
import { NotificationError } from '@application/shared/domain/notification.error';
import { IUseCase } from '@application/shared/use-cases/base.usecase';
import { GetMovieInput, GetMovieOutput } from './get-movie.dto';

export class GetMovieUseCase implements IUseCase<GetMovieInput, GetMovieOutput> {
  constructor(private readonly _movieRepository: IMovieRepository) {}

  async execute(params: GetMovieInput): Promise<GetMovieOutput> {
    try {
      return await this._movieRepository.getById(params.id);
    } catch (error) {
      if (error instanceof NotificationError) {
        throw new BusinessLogicException('get-movie', error.stack, { params });
      } else if (error instanceof DatabaseAccessException) {
        throw new UnknownErrorException(error.message, error.code, error.context, error.stack, error.details);
      }
      throw error;
    }
  }
}
