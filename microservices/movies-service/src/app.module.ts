import { MovieControllerModule } from './controllers/movie/movie.controller.module';
import { MovieController } from './controllers/movie/movie.controller';
// import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [MovieControllerModule],
  controllers: [MovieController],
  providers: [],
})
export class AppModule {}

// MongooseModule.forRoot('mongodb://localhost/nest')
