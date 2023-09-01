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
    return Movie.create(
      props.id || new ObjectId().toString(),
      props.title,
      props.year,
      props.duration || null,
      props.cover,
      props.synopsis || null,
      props.release || null,
      props.directors,
      props.categories,
      props.actors,
      props.classification,
      props.trailers || null,
      props.keywords || null,
      props.distributors || null,
    );
  }

  static createFrom(props: MoviePropsOptional): Movie {
    return Movie.createFrom(
      props.id,
      props.title,
      props.year,
      props.duration,
      props.cover,
      props.synopsis,
      props.release,
      props.directors,
      props.categories,
      props.actors,
      props.classification,
      props.trailers,
      props.keywords,
      props.distributors,
    );
  }
}
