import { Movie } from '@application/domain/models/movie/movie.entity';

export type ListMoviesInput = {
  limit?: number;
  offset?: number;
};

export type ListMoviesOutput = Movie[];
