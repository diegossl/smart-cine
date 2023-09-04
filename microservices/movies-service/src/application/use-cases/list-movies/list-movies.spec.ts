import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { UnknownErrorException } from '@application/shared/exceptions/data/unknown-error.exception';
import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { MovieFactory, MoviePropsRequired } from '@application/domain/models/movie/movie.factory';
import { NotificationError } from '@application/shared/domain/notification.error';
import { Category, Classification } from '@application/shared/domain/enums';
import { Movie } from '@application/domain/models/movie/movie.entity';
import { ListMoviesUseCase } from './list-movies.usecase';
import { TestUtils } from '@application/shared/tests';
import { faker } from '@faker-js/faker';

describe('List Movies Use Case', () => {
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
  const buildUseCase = (movieRepository = TestUtils.movieRepository) => new ListMoviesUseCase(movieRepository);

  it('should list movies', async () => {
    const movies: Movie[] = [];

    for (let index = 0; index < 10; index++) {
      const params = buildParams();
      const movie = buildMovie(params);
      movies.push(movie);
    }

    const movieRepository = TestUtils.movieRepository;
    movieRepository.getAll = jest.fn().mockResolvedValue(movies);

    const useCase = buildUseCase(movieRepository);
    const result = await useCase.execute({ limit: 10, offset: 0 });

    expect(movieRepository.getAll).toHaveBeenCalledTimes(1);

    expect(result).toHaveLength(10);

    result.forEach((movie, index) => {
      expect(movie.id).toEqual(movies[index].id);
      expect(movie.actors).toEqual(movies[index].actors);
      expect(movie.categories).toEqual(movies[index].categories);
      expect(movie.classification).toEqual(movies[index].classification);
      expect(movie.cover).toEqual(movies[index].cover);
      expect(movie.directors).toEqual(movies[index].directors);
      expect(movie.duration).toEqual(movies[index].duration);
      expect(movie.keywords).toEqual(movies[index].keywords);
      expect(movie.release).toEqual(movies[index].release);
      expect(movie.synopsis).toEqual(movies[index].synopsis);
      expect(movie.title).toEqual(movies[index].title);
      expect(movie.trailers).toEqual(movies[index].trailers);
      expect(movie.year).toEqual(movies[index].year);
    });
  });

  it('should throw an error if the database connection fails', async () => {
    const movieRepository = TestUtils.movieRepository;
    movieRepository.getAll = jest
      .fn()
      .mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), faker.number.int({ min: 500, max: 599 })));
    const useCase = buildUseCase(movieRepository);

    let detectedError = null;

    try {
      await useCase.execute({ limit: 10, offset: 0 });
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(UnknownErrorException);
  });

  it('should throw an error if the movie is invalid', async () => {
    const movieRepository = TestUtils.movieRepository;
    movieRepository.getAll = jest.fn().mockRejectedValue(new NotificationError([{ context: 'title', message: 'Invalid title.', field: 'title' }]));
    const useCase = buildUseCase(movieRepository);

    let detectedError = null;

    try {
      await useCase.execute({ limit: 10, offset: 0 });
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(BusinessLogicException);
  });
});
