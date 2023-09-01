import { Category, Classification } from '@application/shared/domain/enums';

export type CreateMovieInput = {
  title: string;
  year: number;
  duration?: number;
  actors: string[];
  cover: string;
  synopsis?: string;
  release?: Date;
  directors: string[];
  categories: Category[];
  classification: Classification;
  trailers?: string[];
  keywords?: string[];
};

export type CreateMovieOutput = {
  id?: string;
  title?: string;
  year?: number;
  duration?: number | null;
  actors?: string[];
  cover?: string;
  synopsis?: string | null;
  release?: Date | null;
  directors?: string[];
  categories?: Category[];
  classification?: Classification;
  trailers?: string[] | null;
  keywords?: string[] | null;
};
