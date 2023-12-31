import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/data/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { NotificationError } from '@application/shared/domain/notification.error';
import { DeleteMovieUseCase } from './delete-movie.usecase';
import { TestUtils } from '@application/shared/tests';
import { DeleteMovieInput } from './delete-movie.dto';
import { faker } from '@faker-js/faker';

describe('Delete Movie Use Case', () => {
  const buildParams = (): DeleteMovieInput => ({ id: faker.database.mongodbObjectId() });
  const buildUseCase = (movieRepository = TestUtils.movieRepository) => new DeleteMovieUseCase(movieRepository);

  it('should delete a movie', async () => {
    const params = buildParams();

    const movieRepository = TestUtils.movieRepository;
    movieRepository.delete = jest.fn().mockResolvedValue(undefined);

    const useCase = buildUseCase(movieRepository);
    await useCase.execute(params);

    expect(movieRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the database connection fails', async () => {
    const params = buildParams();
    const movieRepository = TestUtils.movieRepository;
    movieRepository.delete = jest
      .fn()
      .mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), faker.number.int({ min: 500, max: 599 })));
    const useCase = buildUseCase(movieRepository);

    let detectedError = null;

    try {
      await useCase.execute(params);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(UnknownErrorException);
  });

  it('should throw an error if the movie is invalid', async () => {
    const params = buildParams();
    const movieRepository = TestUtils.movieRepository;
    movieRepository.delete = jest.fn().mockRejectedValue(new NotificationError([{ context: 'title', message: 'Invalid title.', field: 'title' }]));
    const useCase = buildUseCase(movieRepository);

    let detectedError = null;

    try {
      await useCase.execute(params);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(BusinessLogicException);
  });
});
