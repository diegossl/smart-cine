import { IValidator } from '@shared/domain/base.validator';
import { Movie } from '@domain/models/movie/movie.entity';
import * as yup from 'yup';

export class MovieValidatorYup implements IValidator<Movie> {
  public validate(entity: Movie): void {
    try {
      yup
        .object({
          id: yup.string().uuid().required('id-required'),
          title: yup.string().required('title-required'),
          year: yup.number().required('year-required'),
          duration: yup.number().optional(),
          cover: yup.string().required('cover-required'),
          synopsis: yup.string().optional(),
          release: yup.date().optional(),
          director: yup.string().required('director-required'),
          categories: yup.array().of(yup.string()).required('categories-required'),
          actors: yup.array().of(yup.string()).required('actors-required'),
          classification: yup.string().required('classification-required'),
          trailers: yup.array().optional(),
          keywords: yup.array().optional(),
        })
        .validateSync(
          {
            id: entity.id,
            title: entity.title,
            year: entity.year,
            duration: entity.duration,
            cover: entity.cover,
            synopsis: entity.synopsis,
            release: entity.release,
            director: entity.director,
            categories: entity.categories,
            actors: entity.actors,
            classification: entity.classification,
            trailers: entity.trailers,
            keywords: entity.keywords,
          },
          { abortEarly: false, strict: true },
        );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.inner.forEach((detail) => {
        if (detail.type === 'typeError') {
          entity.errorBus.addError({ context: 'movie', field: detail.path, message: `${detail.path}-invalid-type` });
        } else {
          entity.errorBus.addError({ context: 'movie', field: detail.path, message: detail.message });
        }
      });
    }
  }
}
