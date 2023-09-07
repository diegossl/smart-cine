import { MovieRegistry } from '@injection/movie.registry';
import { MovieController } from './movie.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MovieController],
  providers: [MovieRegistry],
  exports: [MovieRegistry],
})
export class MovieControllerModule {}
