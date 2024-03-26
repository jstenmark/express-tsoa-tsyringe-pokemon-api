import { singleton } from 'tsyringe';

import pokemonModel from './model/pokemon.model';
import { Pokemon } from './model/pokemon.schema';
import { CreatePokemonDto } from './dto/createPokemon.dto';

@singleton()
export class PokemonService {
  public async getAll(page = 1, perPage = 10): Promise<{ pokemons: Pokemon[]; totalPages: number }> {
    const totalPokemons = await pokemonModel.countDocuments();
    const totalPages = Math.ceil(totalPokemons / perPage);

    const pokemons = await pokemonModel
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return { pokemons: pokemons.map(p => p.toJSON()), totalPages };
  }

  public async get(_id: number): Promise<Pokemon> {
    return (await pokemonModel.findOne({ _id }).exec())?.toJSON();
  }

  public async create(pokemon: CreatePokemonDto): Promise<Pokemon> {
    return (await pokemonModel.create(pokemon)).toJSON();
  }

  public async update(_id: number, updates: Partial<Pokemon>): Promise<Pokemon> {
    return (await pokemonModel.findByIdAndUpdate(_id, updates).exec())?.toJSON();
  }

  public async delete(_id: number): Promise<boolean> {
    const user = await pokemonModel.findOneAndDelete({ _id }).exec();
    return !!user;
  }
}
