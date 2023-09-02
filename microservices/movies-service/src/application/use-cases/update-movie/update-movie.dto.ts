import { Category, Classification } from '@application/shared/domain/enums';

export type UpdateMovieInput = {
  id: string;
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
  distributors?: string[] | null;
};

export type UpdateMovieOutput = {
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
  distributors?: string[] | null;
};
