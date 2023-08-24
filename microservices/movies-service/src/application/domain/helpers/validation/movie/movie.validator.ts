import { IValidator } from '@shared/domain/base.validator';
import { Movie } from '@domain/models/movie/movie.entity';
import { MovieValidatorYup } from './movie.yup';

export class MovieValidator {
  static create(): IValidator<Movie> {
    return new MovieValidatorYup();
  }
}
