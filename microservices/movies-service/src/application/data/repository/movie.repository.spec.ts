import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { UpdateMovieInput } from '@application/use-cases/update-movie/update-movie.dto';
import { MovieFactory } from '@application/domain/models/movie/movie.factory';
import { Category, Classification } from '@application/shared/domain/enums';
import { IMovieDataSource } from '../dao/movie.dao.interface';
import { TestUtils } from '@application/shared/tests';
import { MovieRepository } from './movie.repository';
import { faker } from '@faker-js/faker';

describe('Movie Repository', () => {
  const buildRepository = (dataSource: IMovieDataSource) => {
    return new MovieRepository(dataSource);
  };

  const buildParams = (): UpdateMovieInput => ({
    id: faker.database.mongodbObjectId(),
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
    distributors: [faker.company.name(), faker.company.name()],
    keywords: [faker.lorem.word(), faker.lorem.word()],
    release: faker.date.past(),
  });

  it('should call getById from movie DAO when getById is called', async () => {
    const dao = TestUtils.movieDAO;
    const id = faker.database.mongodbObjectId();

    const repository = buildRepository(dao);
    await repository.getById(id);

    expect(dao.getById).toHaveBeenCalledWith(id);
  });

  it('should throw "MissingResourceException" when catch "NoResultException" on getById', async () => {
    let detectedError = null;
    try {
      const dao = TestUtils.movieDAO;
      const id = faker.database.mongodbObjectId();

      dao.getById = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), faker.number.int()));

      const repository = buildRepository(dao);
      await repository.getById(id);
    } catch (error) {
      detectedError = error;
    }
    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call getAll from movie DAO when getAll is called', async () => {
    const dao = TestUtils.movieDAO;

    const repository = buildRepository(dao);
    await repository.getAll();

    expect(dao.getAll).toHaveBeenCalledTimes(1);
  });

  it('should throw "MissingResourceException" when catch "NoResultException" on getById', async () => {
    let detectedError = null;
    try {
      const dao = TestUtils.movieDAO;

      dao.getAll = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), faker.number.int()));

      const repository = buildRepository(dao);
      await repository.getAll();
    } catch (error) {
      detectedError = error;
    }
    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call create from movie DAO', () => {
    const dao = TestUtils.movieDAO;

    const movie = MovieFactory.create({
      id: faker.database.mongodbObjectId(),
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
    });

    const repository = buildRepository(dao);
    repository.create(movie);

    expect(dao.create).toHaveBeenCalledWith(movie);
  });

  it('should throw "DatabaseAccessException" when catch unexpected error on create', async () => {
    let detectedError = null;
    try {
      const dao = TestUtils.movieDAO;
      dao.create = jest.fn().mockRejectedValue(new Error(faker.lorem.sentence()));

      const repository = buildRepository(dao);
      await repository.create(
        MovieFactory.create({
          id: faker.database.mongodbObjectId(),
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
        }),
      );
    } catch (error) {
      detectedError = error;
    }
    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call update from movie DAO', () => {
    const dao = TestUtils.movieDAO;

    const params = buildParams();
    const movie = MovieFactory.createFrom(params);

    const repository = buildRepository(dao);
    repository.update(movie);

    expect(dao.update).toHaveBeenCalledWith(movie);
  });

  it('should throw "DatabaseAccessException" when catch unexpected error on update', async () => {
    let detectedError = null;
    try {
      const dao = TestUtils.movieDAO;
      dao.update = jest.fn().mockRejectedValue(new Error(faker.lorem.sentence()));

      const params = buildParams();
      const movie = MovieFactory.createFrom(params);

      const repository = buildRepository(dao);
      await repository.update(movie);
    } catch (error) {
      detectedError = error;
    }
    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call delete from movie DAO when delete is called', async () => {
    const dao = TestUtils.movieDAO;

    const id = faker.database.mongodbObjectId();

    const repository = buildRepository(dao);
    await repository.delete(id);

    expect(dao.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw "MissingResourceException" when catch "NoResultException" on delete', async () => {
    let detectedError = null;
    try {
      const dao = TestUtils.movieDAO;

      const id = faker.database.mongodbObjectId();

      dao.delete = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), faker.number.int()));

      const repository = buildRepository(dao);
      await repository.delete(id);
    } catch (error) {
      detectedError = error;
    }
    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });
});
