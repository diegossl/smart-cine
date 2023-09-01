import { Movie } from '@application/domain/models/movie/movie.entity';
import { IBaseDao } from '@application/shared/data/base.dao';

export interface IMovieDao extends IBaseDao<Movie> {}
