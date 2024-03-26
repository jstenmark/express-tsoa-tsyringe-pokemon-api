import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  _id: number;

  @IsString()
  name: string;

  @IsNumber()
  abilities: string[];

  @IsNumber()
  baseExperience: number;

  @IsNumber()
  height: number;

  @IsArray()
  stats: { name: string; baseStat: number }[];

  @IsArray()
  types: string[];

  @IsNumber()
  weight: number;
}
