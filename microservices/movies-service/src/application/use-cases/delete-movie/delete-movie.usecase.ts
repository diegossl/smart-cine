import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/use-cases/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { IMovieRepository } from '@application/data/repository/movie.repository.interface';
import { NotificationError } from '@application/shared/domain/notification.error';
import { DeleteMovieInput, DeleteMovieOutput } from './delete-movie.dto';
import { IUseCase } from '@application/shared/use-cases/base.usecase';

export class DeleteMovieUseCase implements IUseCase<DeleteMovieInput, DeleteMovieOutput> {
  constructor(private readonly _movieRepository: IMovieRepository) {}

  async execute(params: DeleteMovieInput): Promise<DeleteMovieOutput> {
    try {
      await this._movieRepository.delete(params.id);
    } catch (error) {
      if (error instanceof NotificationError) {
        throw new BusinessLogicException('use-case/delete-movie', error.stack, { params });
      } else if (error instanceof DatabaseAccessException) {
        throw new UnknownErrorException('use-case/delete-movie', error.stack);
      }
      throw error;
    }
  }
}
