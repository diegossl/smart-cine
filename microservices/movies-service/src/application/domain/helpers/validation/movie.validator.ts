import { IValidator } from '@application/shared/domain/base.validator';
import { Movie } from '@application/domain/models/movie/movie.entity';
import { MovieValidatorYup } from './movie.yup';

export class MovieValidator {
  static create(): IValidator<Movie> {
    return new MovieValidatorYup();
  }
}
