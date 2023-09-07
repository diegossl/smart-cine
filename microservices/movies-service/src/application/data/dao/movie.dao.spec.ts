import { DatabaseAccessException } from '@application/shared/exceptions/data/database-access.exception';
import { MovieFactory, MoviePropsOptional } from '@application/domain/models/movie/movie.factory';
import { Category, Classification } from '@application/shared/domain/enums';
import { MovieDataSource } from './movie.dao';
import { faker } from '@faker-js/faker';

describe('Movie DAO', () => {
  const buildDataSource = () => {
    return new MovieDataSource();
  };

  const buildParams = (): MoviePropsOptional => ({
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

  it('should call getById from database when getById is called', async () => {
    const id = faker.database.mongodbObjectId();

    const params = buildParams();
    const movie = MovieFactory.createFrom(params);

    const dataSource = buildDataSource();
    dataSource.getById = jest.fn().mockResolvedValue(movie);

    await dataSource.getById(id);

    expect(dataSource.getById).toHaveBeenCalledWith(id);
  });

  it('should throw "DatabaseAccessException" when catch unexpected error on getById', async () => {
    let detectedError = null;

    try {
      const id = faker.database.mongodbObjectId();

      const dataSource = buildDataSource();
      dataSource.getById = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), 500));

      await dataSource.getById(id);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call getAll from database when getAll is called', async () => {
    const dataSource = buildDataSource();
    dataSource.getAll = jest.fn().mockResolvedValue([]);

    await dataSource.getAll();

    expect(dataSource.getAll).toHaveBeenCalledTimes(1);
  });

  it('should throw "DatabaseAccessException" when catch unexpected error on getById', async () => {
    let detectedError = null;

    try {
      const dataSource = buildDataSource();
      dataSource.getAll = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), 500));

      await dataSource.getAll();
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call create from database', () => {
    const params = buildParams();
    const movie = MovieFactory.createFrom(params);

    const dataSource = buildDataSource();
    dataSource.create = jest.fn().mockResolvedValue(movie);

    dataSource.create(movie);

    expect(dataSource.create).toHaveBeenCalledWith(movie);
  });

  it('should throw "DatabaseAccessException" when catch unexpected error on create', async () => {
    let detectedError = null;

    try {
      const params = buildParams();
      const movie = MovieFactory.createFrom(params);

      const dataSource = buildDataSource();
      dataSource.create = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), 500));

      await dataSource.create(movie);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call update from database', () => {
    const params = buildParams();
    const movie = MovieFactory.createFrom(params);

    const dataSource = buildDataSource();
    dataSource.update = jest.fn().mockResolvedValue(movie);

    dataSource.update(movie);

    expect(dataSource.update).toHaveBeenCalledWith(movie);
  });

  it('should throw "DatabaseAccessException" when catch unexpected error on update', async () => {
    let detectedError = null;

    try {
      const params = buildParams();
      const movie = MovieFactory.createFrom(params);

      const dataSource = buildDataSource();
      dataSource.update = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), 500));

      await dataSource.update(movie);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });

  it('should call delete from database when delete is called', async () => {
    const id = faker.database.mongodbObjectId();

    const dataSource = buildDataSource();
    dataSource.delete = jest.fn().mockResolvedValue(null);

    await dataSource.delete(id);

    expect(dataSource.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw "DatabaseAccessException" when catch unexpected error on delete', async () => {
    let detectedError = null;

    try {
      const id = faker.database.mongodbObjectId();

      const dataSource = buildDataSource();
      dataSource.delete = jest.fn().mockRejectedValue(new DatabaseAccessException(faker.lorem.sentence(), 500));

      await dataSource.delete(id);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(DatabaseAccessException);
  });
});
