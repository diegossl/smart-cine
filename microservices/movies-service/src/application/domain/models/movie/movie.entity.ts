import { MovieValidator } from '@domain/helpers/validation/movie/movie.validator';
import { NotificationError } from '@shared/domain/notification.error';
import { Category, Classification } from '@shared/domain/enums';
import { Entity } from '@shared/domain/base.entity';

export class Movie extends Entity {
  private _title: string;
  private _year: number;
  private _duration: number | null;
  private _cover: string;
  private _synopsis: string | null;
  private _release: Date | null;
  private _director: string;
  private _categories: Category[];
  private _actors: string[];
  private _classification: Classification;
  private _trailers: string[] | null;
  private _keywords: string[] | null;

  constructor(
    id: string,
    title: string,
    year: number,
    duration: number | null,
    cover: string,
    synopsis: string | null,
    release: Date | null,
    director: string,
    categories: Category[],
    actors: string[],
    classification: Classification,
    trailers: string[] | null,
    keywords: string[] | null,
  ) {
    super(id);
    this._title = title;
    this._year = year;
    this._duration = duration;
    this._cover = cover;
    this._synopsis = synopsis;
    this._release = release;
    this._director = director;
    this._categories = categories;
    this._actors = actors;
    this._classification = classification;
    this._trailers = trailers;
    this._keywords = keywords;

    this.validate();
    if (this.errorBus.hasErrors()) {
      throw new NotificationError(this.errorBus.getErrors());
    }
  }

  protected validate(): void {
    MovieValidator.create().validate(this);
  }

  changeTitle(title: string): void {
    const oldTitle = this._title;
    this._title = title;
    this.validate();
    if (this.errorBus.hasErrorsFor('title')) {
      this._title = oldTitle;
      throw new NotificationError(this.errorBus.getErrorsFor('title'));
    }
  }

  public changeYear(year: number): void {
    const oldYear = this._year;
    this._year = year;
    this.validate();
    if (this.errorBus.hasErrorsFor('year')) {
      this._year = oldYear;
      throw new NotificationError(this.errorBus.getErrorsFor('year'));
    }
  }

  public changeDuration(duration: number): void {
    const oldDuration = this._duration;
    this._duration = duration;
    this.validate();
    if (this.errorBus.hasErrorsFor('duration')) {
      this._duration = oldDuration;
      throw new NotificationError(this.errorBus.getErrorsFor('duration'));
    }
  }

  public changeCover(cover: string): void {
    const oldCover = this._cover;
    this._cover = cover;
    this.validate();
    if (this.errorBus.hasErrorsFor('cover')) {
      this._cover = oldCover;
      throw new NotificationError(this.errorBus.getErrorsFor('cover'));
    }
  }

  public changeSynopsis(synopsis: string): void {
    const oldSynopsis = this._synopsis;
    this._synopsis = synopsis;
    this.validate();
    if (this.errorBus.hasErrorsFor('synopsis')) {
      this._synopsis = oldSynopsis;
      throw new NotificationError(this.errorBus.getErrorsFor('synopsis'));
    }
  }

  public changeRelease(release: Date): void {
    const oldRelease = this._release;
    this._release = release;
    this.validate();
    if (this.errorBus.hasErrorsFor('release')) {
      this._release = oldRelease;
      throw new NotificationError(this.errorBus.getErrorsFor('release'));
    }
  }

  public changeDirector(director: string): void {
    const oldDirector = this._director;
    this._director = director;
    this.validate();
    if (this.errorBus.hasErrorsFor('director')) {
      this._director = oldDirector;
      throw new NotificationError(this.errorBus.getErrorsFor('director'));
    }
  }

  public changeCategories(categories: Category[]): void {
    const oldCategories = this._categories;
    this._categories = categories;
    this.validate();
    if (this.errorBus.hasErrorsFor('categories')) {
      this._categories = oldCategories;
      throw new NotificationError(this.errorBus.getErrorsFor('categories'));
    }
  }

  public changeActors(actors: string[]): void {
    const oldActors = this._actors;
    this._actors = actors;
    this.validate();
    if (this.errorBus.hasErrorsFor('actors')) {
      this._actors = oldActors;
      throw new NotificationError(this.errorBus.getErrorsFor('actors'));
    }
  }

  public changeClassification(classification: Classification): void {
    const oldClassification = this._classification;
    this._classification = classification;
    this.validate();
    if (this.errorBus.hasErrorsFor('classification')) {
      this._classification = oldClassification;
      throw new NotificationError(this.errorBus.getErrorsFor('classification'));
    }
  }

  public changeTrailer(trailer: string[]): void {
    const oldTrailer = this._trailers;
    this._trailers = trailer;
    this.validate();
    if (this.errorBus.hasErrorsFor('trailer')) {
      this._trailers = oldTrailer;
      throw new NotificationError(this.errorBus.getErrorsFor('trailer'));
    }
  }

  public changeKeywords(keywords: string[]): void {
    const oldKeywords = this._keywords;
    this._keywords = keywords;
    this.validate();
    if (this.errorBus.hasErrorsFor('keywords')) {
      this._keywords = oldKeywords;
      throw new NotificationError(this.errorBus.getErrorsFor('keywords'));
    }
  }

  public get title(): string {
    return this._title;
  }

  public get year(): number {
    return this._year;
  }

  public get duration(): number | null {
    return this._duration;
  }

  public get cover(): string {
    return this._cover;
  }

  public get synopsis(): string | null {
    return this._synopsis;
  }

  public get release(): Date | null {
    return this._release;
  }

  public get director(): string {
    return this._director;
  }

  public get categories(): string[] {
    return this._categories;
  }

  public get actors(): string[] {
    return this._actors;
  }

  public get classification(): string {
    return this._classification;
  }

  public get trailers(): string[] | null {
    return this._trailers;
  }

  public get keywords(): string[] | null {
    return this._keywords;
  }
}
