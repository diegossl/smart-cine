import { Category, Classification } from '@shared/domain/enums';
import { Movie } from './movie.entity';
import * as uuid from 'uuid';

export type MovieProps = {
  id?: string;
  title: string;
  year: number;
  duration?: number;
  cover: string;
  synopsis?: string;
  release?: Date;
  director: string;
  categories: Category[];
  actors: string[];
  classification: Classification;
  trailers?: string[];
  keywords?: string[];
};

export class MovieFactory {
  static create(props: MovieProps): Movie {
    return new Movie(
      props.id || uuid.v4(),
      props.title,
      props.year,
      props.duration || null,
      props.cover,
      props.synopsis || null,
      props.release || null,
      props.director,
      props.categories,
      props.actors,
      props.classification,
      props.trailers || null,
      props.keywords || null,
    );
  }
}
