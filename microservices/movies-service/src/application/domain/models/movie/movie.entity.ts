import { MovieValidator } from '@application/domain/helpers/validation/movie.validator';
import { NotificationError } from '@application/shared/domain/notification.error';
import { Category, Classification } from '@application/shared/domain/enums';
import { MoviePropsOptional, MoviePropsRequired } from './movie.factory';
import { Entity } from '@application/shared/domain/base.entity';

export class Movie extends Entity {
  private _title: string | undefined;
  private _year: number | undefined;
  private _duration: number | null | undefined;
  private _cover: string | undefined;
  private _synopsis: string | null | undefined;
  private _release: Date | null | undefined;
  private _directors: string[] | undefined;
  private _categories: Category[] | undefined;
  private _actors: string[] | undefined;
  private _classification: Classification | undefined;
  private _trailers: string[] | null | undefined;
  private _keywords: string[] | null | undefined;
  private _distributors: string[] | null | undefined;

  private constructor(props: MoviePropsOptional) {
    super(props.id);
    this._title = props.title;
    this._year = props.year;
    this._duration = props.duration;
    this._cover = props.cover;
    this._synopsis = props.synopsis;
    this._release = props.release;
    this._directors = props.directors;
    this._categories = props.categories;
    this._actors = props.actors;
    this._classification = props.classification;
    this._trailers = props.trailers;
    this._keywords = props.keywords;
    this._distributors = props.distributors;

    this.clean();
    this.validate();
    if (this.errorBus.hasErrors()) {
      throw new NotificationError(this.errorBus.getErrors());
    }
  }

  public static create(props: MoviePropsRequired): Movie {
    return new Movie({
      id: props.id,
      title: props.title,
      year: props.year,
      duration: props.duration,
      cover: props.cover,
      synopsis: props.synopsis,
      release: props.release,
      directors: props.directors,
      categories: props.categories,
      actors: props.actors,
      classification: props.classification,
      trailers: props.trailers,
      keywords: props.keywords,
      distributors: props.distributors,
    });
  }

  public static createFrom(props: MoviePropsOptional): Movie {
    return new Movie({
      id: props.id,
      title: props.title,
      year: props.year,
      duration: props.duration,
      cover: props.cover,
      synopsis: props.synopsis,
      release: props.release,
      directors: props.directors,
      categories: props.categories,
      actors: props.actors,
      classification: props.classification,
      trailers: props.trailers,
      keywords: props.keywords,
      distributors: props.distributors,
    });
  }

  protected validate(): void {
    MovieValidator.create().validate(this);
  }

  private clean(): void {
    this._title = this._title?.trim();
    this._cover = this._cover?.trim();
    this._synopsis = this._synopsis?.trim();
    this._directors = this._directors?.map((director) => director.trim());
    this._actors = this._actors?.map((actor) => actor.trim());
    this._trailers = this._trailers?.map((trailer) => trailer.trim());
    this._keywords = this._keywords?.map((keyword) => keyword.trim());
  }

  public changeTitle(title: string): void {
    this._title = title;
    this.validate();
    if (this.errorBus.hasErrorsFor('title')) {
      throw new NotificationError(this.errorBus.getErrorsFor('title'));
    }
  }

  public changeYear(year: number): void {
    this._year = year;
    this.validate();
    if (this.errorBus.hasErrorsFor('year')) {
      throw new NotificationError(this.errorBus.getErrorsFor('year'));
    }
  }

  public changeDuration(duration: number | null): void {
    this._duration = duration;
    this.validate();
    if (this.errorBus.hasErrorsFor('duration')) {
      throw new NotificationError(this.errorBus.getErrorsFor('duration'));
    }
  }

  public changeCover(cover: string): void {
    this._cover = cover;
    this.validate();
    if (this.errorBus.hasErrorsFor('cover')) {
      throw new NotificationError(this.errorBus.getErrorsFor('cover'));
    }
  }

  public changeSynopsis(synopsis: string | null): void {
    this._synopsis = synopsis;
    this.validate();
    if (this.errorBus.hasErrorsFor('synopsis')) {
      throw new NotificationError(this.errorBus.getErrorsFor('synopsis'));
    }
  }

  public changeRelease(release: Date | null): void {
    this._release = release;
    this.validate();
    if (this.errorBus.hasErrorsFor('release')) {
      throw new NotificationError(this.errorBus.getErrorsFor('release'));
    }
  }

  public changeDirectors(directors: string[]): void {
    this._directors = directors;
    this.validate();
    if (this.errorBus.hasErrorsFor('directors')) {
      throw new NotificationError(this.errorBus.getErrorsFor('directors'));
    }
  }

  public changeCategories(categories: Category[]): void {
    this._categories = categories;
    this.validate();
    if (this.errorBus.hasErrorsFor('categories')) {
      throw new NotificationError(this.errorBus.getErrorsFor('categories'));
    }
  }

  public changeActors(actors: string[]): void {
    this._actors = actors;
    this.validate();
    if (this.errorBus.hasErrorsFor('actors')) {
      throw new NotificationError(this.errorBus.getErrorsFor('actors'));
    }
  }

  public changeClassification(classification: Classification): void {
    this._classification = classification;
    this.validate();
    if (this.errorBus.hasErrorsFor('classification')) {
      throw new NotificationError(this.errorBus.getErrorsFor('classification'));
    }
  }

  public changeTrailers(trailers: string[] | null): void {
    this._trailers = trailers;
    this.validate();
    if (this.errorBus.hasErrorsFor('trailers')) {
      throw new NotificationError(this.errorBus.getErrorsFor('trailers'));
    }
  }

  public changeKeywords(keywords: string[] | null): void {
    this._keywords = keywords;
    this.validate();
    if (this.errorBus.hasErrorsFor('keywords')) {
      throw new NotificationError(this.errorBus.getErrorsFor('keywords'));
    }
  }

  public changeDistributors(distributors: string[] | null): void {
    this._distributors = distributors;
    this.validate();
    if (this.errorBus.hasErrorsFor('distributors')) {
      throw new NotificationError(this.errorBus.getErrorsFor('distributors'));
    }
  }

  public get title(): string | undefined {
    return this._title;
  }

  public get year(): number | undefined {
    return this._year;
  }

  public get duration(): number | null | undefined {
    return this._duration;
  }

  public get cover(): string | undefined {
    return this._cover;
  }

  public get synopsis(): string | null | undefined {
    return this._synopsis;
  }

  public get release(): Date | null | undefined {
    return this._release;
  }

  public get directors(): string[] | undefined {
    return this._directors;
  }

  public get categories(): Category[] | undefined {
    return this._categories;
  }

  public get actors(): string[] | undefined {
    return this._actors;
  }

  public get classification(): Classification | undefined {
    return this._classification;
  }

  public get trailers(): string[] | null | undefined {
    return this._trailers;
  }

  public get keywords(): string[] | null | undefined {
    return this._keywords;
  }

  public get distributors(): string[] | null | undefined {
    return this._distributors;
  }
}
