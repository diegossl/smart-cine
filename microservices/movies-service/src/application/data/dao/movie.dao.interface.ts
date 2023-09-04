import { Movie } from '@application/domain/models/movie/movie.entity';
import { IBaseDataSource } from '@application/shared/data/base.dao';

export interface IMovieDataSource extends IBaseDataSource<Movie> {}
