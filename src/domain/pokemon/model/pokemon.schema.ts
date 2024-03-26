import { Schema, Document } from 'mongoose';

export interface Pokemon {
  _id: number;
  name: string;
  abilities: string[];
  baseExperience: number;
  height: number;
  stats: {
    name: string;
    baseStat: number;
  }[];
  types: string[];
  weight: number;
}

export type PokemonI = Pokemon & Document;

export const PokemonSchema: Schema<PokemonI> = new Schema<PokemonI>({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  abilities: [String],
  baseExperience: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  stats: [
    {
      name: String,
      baseStat: Number,
    },
  ],
  types: [String],
  weight: {
    type: Number,
    required: true,
  },
});
