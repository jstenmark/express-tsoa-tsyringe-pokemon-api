import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class UpdatePokemonDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  abilities?: string[];

  @IsOptional()
  @IsNumber()
  baseExperience?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsArray()
  stats?: { name: string; baseStat: number }[];

  @IsOptional()
  @IsArray()
  types?: string[];

  @IsOptional()
  @IsNumber()
  weight?: number;
}
