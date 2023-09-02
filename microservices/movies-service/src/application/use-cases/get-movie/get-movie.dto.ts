import { Movie } from '@application/domain/models/movie/movie.entity';

export type GetMovieInput = {
  id: string;
};

export type GetMovieOutput = Movie;
