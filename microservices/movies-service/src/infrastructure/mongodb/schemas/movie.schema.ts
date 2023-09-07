import { Movie } from '@application/domain/models/movie/movie.entity';
import { model, Schema } from 'mongoose';

const schema = new Schema<Movie>(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    cover: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: false,
    },
    release: {
      type: Date,
      required: false,
    },
    directors: {
      type: [String],
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    actors: {
      type: [String],
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
    trailers: {
      type: [String],
      required: false,
    },
    keywords: {
      type: [String],
      required: false,
    },
    distributors: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const MovieModel = model<Movie>('Movie', schema);

export { MovieModel };
