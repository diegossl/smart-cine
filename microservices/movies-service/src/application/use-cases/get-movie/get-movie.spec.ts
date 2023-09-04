import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/data/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { MovieFactory, MoviePropsRequired } from '@application/domain/models/movie/movie.factory';
import { NotificationError } from '@application/shared/domain/notification.error';
import { Category, Classification } from '@application/shared/domain/enums';
import { TestUtils } from '@application/shared/tests';
import { GetMovieUseCase } from './get-movie.usecase';
import { faker } from '@faker-js/faker';

describe('Get Movie Use Case', () => {
  const buildParams = (): MoviePropsRequired => ({
    title: faker.lorem.words(3),
    synopsis: faker.lorem.words(10),
    duration: faker.number.int({ min: 60, max: 180 }),
    year: faker.number.int({ min: 1980, max: new Date().getFullYear() }),
    cover: faker.image.url(),
    trailers: [faker.image.url()],
    classification: faker.helpers.arrayElement<Classification>(Object.values(Classification)),
    categories: [faker.helpers.arrayElement<Category>(Object.values(Category))],
    actors: [faker.person.firstName(), faker.person.firstName()],
    directors: [faker.person.firstName(), faker.person.firstName()],
    release: faker.date.past(),
    keywords: [faker.lorem.word(), faker.lorem.word()],
    distributors: [faker.company.name(), faker.company.name()],
  });
  const buildMovie = (params: MoviePropsRequired) => MovieFactory.create(params);
  const buildUseCase = (movieRepository = TestUtils.movieRepository) => new GetMovieUseCase(movieRepository);

  it('should get a movie by id', async () => {
    const params = buildParams();
    const movie = buildMovie(params);

    const movieRepository = TestUtils.movieRepository;
    movieRepository.getById = jest.fn().mockResolvedValue(movie);

    const useCase = buildUseCase(movieRepository);
    const result = await useCase.execute({ id: faker.database.mongodbObjectId() });

    expect(movieRepository.getById).toHaveBeenCalledTimes(1);

    expect(result.id).toEqual(movie.id);
    expect(result.actors).toEqual(params.actors);
    expect(result.categories).toEqual(params.categories);
    expect(result.classification).toEqual(params.classification);
    expect(result.cover).toEqual(params.cover);
    expect(result.directors).toEqual(params.directors);
    expect(result.duration).toEqual(params.duration);
    expect(result.keywords).toEqual(movie.keywords);
    expect(result.release).toEqual(movie.release);
    expect(result.synopsis).toEqual(params.synopsis);
    expect(result.title).toEqual(params.title);
    expect(result.trailers).toEqual(params.trailers);
    expect(result.year).toEqual(params.year);
  });

  it('should throw an error if the database connection fails', async () => {
    const movieRepository = TestUtils.movieRepository;
    movieRepository.getById = jest
      .fn()
      .mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), faker.number.int({ min: 500, max: 599 })));
    const useCase = buildUseCase(movieRepository);

    let detectedError = null;

    try {
      await useCase.execute({ id: faker.database.mongodbObjectId() });
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(UnknownErrorException);
  });

  it('should throw an error if the movie is invalid', async () => {
    const movieRepository = TestUtils.movieRepository;
    movieRepository.getById = jest.fn().mockRejectedValue(new NotificationError([{ context: 'title', message: 'Invalid title.', field: 'title' }]));
    const useCase = buildUseCase(movieRepository);

    let detectedError = null;

    try {
      await useCase.execute({ id: faker.database.mongodbObjectId() });
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(BusinessLogicException);
  });
});
