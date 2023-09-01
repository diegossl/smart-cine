import { NotificationError } from '@application/shared/domain/notification.error';
import { Category, Classification } from '@application/shared/domain/enums';
import { MovieFactory, MoviePropsRequired } from './movie.factory';
import { faker } from '@faker-js/faker';
import { Movie } from './movie.entity';

describe('Movie Entity Test', () => {
  const makeMovie = (props: MoviePropsRequired): Movie => MovieFactory.create(props);
  const makeProps = (): MoviePropsRequired => ({
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
  });

  it('should be defined', () => {
    const props = makeProps();
    const movie = makeMovie(props);

    expect(movie).toBeDefined();
  });

  it('should create a valid movie', () => {
    const props = makeProps();
    const movie = makeMovie(props);

    expect(movie.title).toBe(props.title);
    expect(movie.synopsis).toBe(props.synopsis);
    expect(movie.duration).toBe(props.duration);
    expect(movie.year).toBe(props.year);
    expect(movie.cover).toBe(props.cover);
    expect(movie.trailers).toStrictEqual(props.trailers);
    expect(movie.classification).toBe(props.classification);
    expect(movie.categories).toStrictEqual(props.categories);
    expect(movie.actors).toStrictEqual(props.actors);
    expect(movie.directors).toStrictEqual(props.directors);
    expect(movie.distributors).toStrictEqual(props.distributors);
  });

  it('should update the title', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newTitle = faker.lorem.words(3);

    movie.changeTitle(newTitle);

    expect(movie.title).toBe(newTitle);
  });

  it('should fail to update the title with an invalid title', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newTitle = faker.number.int() as unknown as string;

    let detectedError = null;

    try {
      movie.changeTitle(newTitle);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the synopsis', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newSynopsis = faker.lorem.words(10);

    movie.changeSynopsis(newSynopsis);

    expect(movie.synopsis).toBe(newSynopsis);
  });

  it('should fail to update the synopsis with an invalid synopsis', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newSynopsis = faker.number.int() as unknown as string;

    let detectedError = null;

    try {
      movie.changeSynopsis(newSynopsis);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the duration', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newDuration = faker.number.int(200);

    movie.changeDuration(newDuration);

    expect(movie.duration).toBe(newDuration);
  });

  it('should fail to update the duration with an invalid duration', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newDuration = faker.lorem.word() as unknown as number;

    let detectedError = null;

    try {
      movie.changeDuration(newDuration);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the year', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newYear = faker.number.int(new Date().getFullYear());

    movie.changeYear(newYear);

    expect(movie.year).toBe(newYear);
  });

  it('should fail to update the year with an invalid year', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newYear = faker.lorem.word() as unknown as number;

    let detectedError = null;

    try {
      movie.changeYear(newYear);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the cover', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newCover = faker.image.url();

    movie.changeCover(newCover);

    expect(movie.cover).toBe(newCover);
  });

  it('should fail to update the cover with an invalid cover', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newCover = faker.number.int() as unknown as string;

    let detectedError = null;

    try {
      movie.changeCover(newCover);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the trailers', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newTrailers = [faker.image.url()];

    movie.changeTrailers(newTrailers);

    expect(movie.trailers).toBe(newTrailers);
  });

  it('should fail to update the trailers with an invalid trailers', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newTrailers = faker.number.int() as unknown as string[];

    let detectedError = null;

    try {
      movie.changeTrailers(newTrailers);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the classification', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newClassification = faker.helpers.arrayElement(Object.values(Classification));

    movie.changeClassification(newClassification);

    expect(movie.classification).toBe(newClassification);
  });

  it('should fail to update the classification with an invalid classification', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newClassification = faker.number.int() as unknown as Classification;

    let detectedError = null;

    try {
      movie.changeClassification(newClassification);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the categories', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newCategories = [faker.helpers.arrayElement(Object.values(Category))];

    movie.changeCategories(newCategories);

    expect(movie.categories).toBe(newCategories);
  });

  it('should fail to update the categories with an invalid categories', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newCategories = faker.number.int() as unknown as Category[];

    let detectedError = null;

    try {
      movie.changeCategories(newCategories);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the actors', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newActors = [faker.person.firstName()];

    movie.changeActors(newActors);

    expect(movie.actors).toBe(newActors);
  });

  it('should fail to update the actors with an invalid actors', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newActors = faker.number.int() as unknown as string[];

    let detectedError = null;

    try {
      movie.changeActors(newActors);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the directors', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newDirectors = [faker.person.firstName()];

    movie.changeDirectors(newDirectors);

    expect(movie.directors).toBe(newDirectors);
  });

  it('should fail to update the directors with an invalid directors', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newDirectors = faker.number.int() as unknown as string[];

    let detectedError = null;

    try {
      movie.changeDirectors(newDirectors);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });

  it('should update the distributors', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newDistributors = [faker.company.name()];

    movie.changeDistributors(newDistributors);

    expect(movie.distributors).toBe(newDistributors);
  });

  it('should fail to update the distributors with an invalid distributors', () => {
    const props = makeProps();
    const movie = makeMovie(props);
    const newDistributors = faker.number.int() as unknown as string[];

    let detectedError = null;

    try {
      movie.changeDistributors(newDistributors);
    } catch (error) {
      detectedError = error;
    }

    expect(detectedError).toBeInstanceOf(NotificationError);
  });
});
