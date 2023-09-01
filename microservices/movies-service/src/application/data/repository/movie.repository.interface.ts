import { IBaseRepository } from '@application/shared/data/base.repository';
import { Movie } from '@application/domain/models/movie/movie.entity';

export interface IMovieRepository extends IBaseRepository<Movie> {}
