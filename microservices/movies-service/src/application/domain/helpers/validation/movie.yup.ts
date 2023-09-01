import { IValidator } from '@application/shared/domain/base.validator';
import { Movie } from '@application/domain/models/movie/movie.entity';
import { Classification } from '@application/shared/domain/enums';
import { Category } from '@application/shared/domain/enums';
import { ObjectId } from 'mongodb';
import * as yup from 'yup';

export class MovieValidatorYup implements IValidator<Movie> {
  public validate(entity: Movie): void {
    try {
      yup
        .object({
          id: yup.mixed((value): value is ObjectId => ObjectId.isValid(value)).required('id-required'),
          title: yup.string().required('title-required'),
          year: yup.number().required('year-required'),
          duration: yup.number().integer().nullable(),
          cover: yup.string().required('cover-required'),
          synopsis: yup.string().nullable(),
          release: yup.date().nullable(),
          directors: yup.array().of(yup.string()).required('directors-required'),
          categories: yup.array(yup.mixed<Category>().oneOf(Object.values(Category)).required('categories-required')).ensure(),
          actors: yup.array().of(yup.string()).required('actors-required'),
          classification: yup.mixed<Classification>().oneOf(Object.values(Classification)).required('classification-required'),
          trailers: yup.array().of(yup.string().url()).nullable(),
          keywords: yup.array().of(yup.string()).nullable(),
          distributors: yup.array().of(yup.string()).nullable(),
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
            directors: entity.directors,
            categories: entity.categories,
            actors: entity.actors,
            classification: entity.classification,
            trailers: entity.trailers,
            keywords: entity.keywords,
            distributors: entity.distributors,
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
