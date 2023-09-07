import { InternalServerErrorException } from '@application/shared/exceptions/controllers/internal-server-error.exception';
import { BusinessLogicException } from '@application/shared/exceptions/use-cases/business-logic.exception';
import { BadRequestException } from '@application/shared/exceptions/controllers/bad-request.exception';
import { CreateMovieDto, ListMoviesDto, ParamMovieDto, UpdateMovieDto } from './movie.controller.dto';
import { UnknownErrorException } from '@application/shared/exceptions/data/unknown-error.exception';
import { Controller, Get, Post, Put, Param, Delete, Body, Query } from '@nestjs/common';
import { MovieRegistry } from '@injection/movie.registry';

@Controller('movies')
export class MovieController {
  constructor(private readonly _movieRegistry: MovieRegistry) {}

  @Get()
  async listMovies(@Query() data: ListMoviesDto): Promise<any> {
    try {
      return await this._movieRegistry.listMovies.execute({ limit: data.limit, offset: data.offset });
    } catch (error) {
      if (error instanceof BusinessLogicException) {
        throw new BadRequestException(error.context, error.stack, error.details);
      } else if (error instanceof UnknownErrorException) {
        throw new InternalServerErrorException(error.context, error.stack, error.details);
      }
    }
  }

  @Get(':id')
  async getMovie(@Param() param: ParamMovieDto): Promise<any> {
    try {
      return await this._movieRegistry.getMovie.execute({ id: param.id });
    } catch (error) {
      if (error instanceof BusinessLogicException) {
        throw new BadRequestException(error.context, error.stack, error.details);
      } else if (error instanceof UnknownErrorException) {
        throw new InternalServerErrorException(error.context, error.stack, error.details);
      }
    }
  }

  @Post()
  async createMovie(@Body() data: CreateMovieDto): Promise<any> {
    try {
      return await this._movieRegistry.createMovie.execute({ ...data });
    } catch (error) {
      if (error instanceof BusinessLogicException) {
        throw new BadRequestException(error.context, error.stack, error.details);
      } else if (error instanceof UnknownErrorException) {
        throw new InternalServerErrorException(error.context, error.stack, error.details);
      }
    }
  }

  @Put(':id')
  async updateMovie(@Param() param: ParamMovieDto, @Body() data: UpdateMovieDto): Promise<any> {
    try {
      return await this._movieRegistry.updateMovie.execute({ id: param.id, ...data });
    } catch (error) {
      if (error instanceof BusinessLogicException) {
        throw new BadRequestException(error.context, error.stack, error.details);
      } else if (error instanceof UnknownErrorException) {
        throw new InternalServerErrorException(error.context, error.stack, error.details);
      }
    }
  }

  @Delete(':id')
  async deleteMovie(@Param() param: ParamMovieDto): Promise<any> {
    try {
      return await this._movieRegistry.deleteMovie.execute({ id: param.id });
    } catch (error) {
      if (error instanceof BusinessLogicException) {
        throw new BadRequestException(error.context, error.stack, error.details);
      } else if (error instanceof UnknownErrorException) {
        throw new InternalServerErrorException(error.context, error.stack, error.details);
      }
    }
  }
}
