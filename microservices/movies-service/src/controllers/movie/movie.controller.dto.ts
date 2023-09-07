import { IsString, IsInt, IsDate, IsArray, ValidateNested, ArrayMinSize, IsEnum, IsOptional } from 'class-validator';
import { Category, Classification } from '@application/shared/domain/enums';

export class ParamMovieDto {
  @IsString({ message: 'Id must be a string' })
  id: string;
}

export class ListMoviesDto {
  @IsOptional()
  @IsInt({ message: 'Limit must be a number' })
  limit?: number;

  @IsOptional()
  @IsInt({ message: 'Offset must be a number' })
  offset?: number;
}

export class CreateMovieDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsInt({ message: 'Year must be a number' })
  year: number;

  @IsOptional()
  @IsInt({ message: 'Duration must be a number' })
  duration?: number;

  @IsArray({ message: 'Actors must be an array' })
  @ValidateNested({ each: true, message: 'Actors must be an array of strings' })
  actors: string[];

  @IsString({ message: 'Cover must be a string' })
  cover: string;

  @IsOptional()
  @IsString({ message: 'Synopsis must be a string' })
  synopsis?: string;

  @IsOptional()
  @IsDate({ message: 'Release must be a date' })
  release?: Date;

  @IsArray({ message: 'Directors must be an array' })
  @ValidateNested({ each: true, message: 'Directors must be an array of strings' })
  directors: string[];

  @IsArray()
  @ArrayMinSize(1, { message: 'The array must have at least one element' })
  @IsEnum(Category, { each: true, message: 'The type of each element must be a valid category' })
  categories: Category[];

  @IsArray({ message: 'Classification must be an array' })
  @ArrayMinSize(1, { message: 'The array must have at least one element' })
  @IsEnum(Classification, { each: true, message: 'The type of each element must be a valid classification' })
  classification: Classification;

  @IsOptional()
  @IsArray({ message: 'Trailers must be an array' })
  @ValidateNested({ each: true, message: 'The type of each element must be a valid url' })
  trailers?: string[];

  @IsOptional()
  @IsArray({ message: 'Keywords must be an array' })
  @ValidateNested({ each: true, message: 'The type of each element must be a valid keyword' })
  keywords?: string[];
}

export class UpdateMovieDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsInt({ message: 'Year must be a number' })
  year?: number;

  @IsOptional()
  @IsInt({ message: 'Duration must be a number' })
  duration?: number;

  @IsOptional()
  @IsArray({ message: 'Actors must be an array' })
  @ValidateNested({ each: true, message: 'Actors must be an array of strings' })
  actors?: string[];

  @IsOptional()
  @IsString({ message: 'Cover must be a string' })
  cover?: string;

  @IsOptional()
  @IsString({ message: 'Synopsis must be a string' })
  synopsis?: string;

  @IsOptional()
  @IsDate({ message: 'Release must be a date' })
  release?: Date;

  @IsOptional()
  @IsArray({ message: 'Directors must be an array' })
  @ValidateNested({ each: true, message: 'Directors must be an array of strings' })
  directors?: string[];

  @IsOptional()
  @IsArray({ message: 'Categories must be an array' })
  @ArrayMinSize(1, { message: 'The array must have at least one element' })
  @IsEnum(Category, { each: true, message: 'The type of each element must be a valid category' })
  categories?: Category[];

  @IsOptional()
  @IsArray({ message: 'Classification must be an array' })
  @ArrayMinSize(1, { message: 'The array must have at least one element' })
  @IsEnum(Classification, { each: true, message: 'The type of each element must be a valid classification' })
  classification?: Classification;

  @IsOptional()
  @IsArray({ message: 'Trailers must be an array' })
  @ValidateNested({ each: true, message: 'The type of each element must be a valid url' })
  trailers?: string[];

  @IsOptional()
  @IsArray({ message: 'Keywords must be an array' })
  @ValidateNested({ each: true, message: 'The type of each element must be a valid keyword' })
  keywords?: string[];
}
