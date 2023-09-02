import { Category, Classification } from '@application/shared/domain/enums';
import { Movie } from './movie.entity';
import { ObjectId } from 'mongodb';

export type MoviePropsRequired = {
  id?: string;
  title: string;
  year: number;
  duration?: number | null;
  cover: string;
  synopsis?: string | null;
  release?: Date | null;
  directors: string[];
  categories: Category[];
  actors: string[];
  classification: Classification;
  trailers?: string[] | null;
  keywords?: string[] | null;
  distributors?: string[] | null;
};

export type MoviePropsOptional = Partial<MoviePropsRequired>;

export class MovieFactory {
  static create(props: MoviePropsRequired): Movie {
    return Movie.create({
      id: props.id || new ObjectId().toString(),
      title: props.title,
      year: props.year,
      duration: props.duration || null,
      cover: props.cover,
      synopsis: props.synopsis || null,
      release: props.release || null,
      directors: props.directors,
      categories: props.categories,
      actors: props.actors,
      classification: props.classification,
      trailers: props.trailers || null,
      keywords: props.keywords || null,
      distributors: props.distributors || null,
    });
  }

  static createFrom(props: MoviePropsOptional): Movie {
    return Movie.createFrom({
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
}
