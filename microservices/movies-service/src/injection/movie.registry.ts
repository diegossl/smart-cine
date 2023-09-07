import { CreateMovieUseCase } from '@application/use-cases/create-movie/create-movie.usecase';
import { DeleteMovieUseCase } from '@application/use-cases/delete-movie/delete-movie.usecase';
import { UpdateMovieUseCase } from '@application/use-cases/update-movie/update-movie.usecase';
import { ListMoviesUseCase } from '@application/use-cases/list-movies/list-movies.usecase';
import { IMovieRepository } from '@application/data/repository/movie.repository.interface';
import { GetMovieUseCase } from '@application/use-cases/get-movie/get-movie.usecase';
import { MovieRepository } from '@application/data/repository/movie.repository';
import { IMovieDataSource } from '@application/data/dao/movie.dao.interface';
import { MovieDataSource } from '@application/data/dao/movie.dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieRegistry {
  public readonly getMovie: GetMovieUseCase;
  public readonly listMovies: ListMoviesUseCase;
  public readonly createMovie: CreateMovieUseCase;
  public readonly updateMovie: UpdateMovieUseCase;
  public readonly deleteMovie: DeleteMovieUseCase;

  constructor() {
    const movieDataSource: IMovieDataSource = new MovieDataSource();
    const movieRepository: IMovieRepository = new MovieRepository(movieDataSource);

    this.getMovie = new GetMovieUseCase(movieRepository);
    this.listMovies = new ListMoviesUseCase(movieRepository);
    this.createMovie = new CreateMovieUseCase(movieRepository);
    this.updateMovie = new UpdateMovieUseCase(movieRepository);
    this.deleteMovie = new DeleteMovieUseCase(movieRepository);
  }
}
