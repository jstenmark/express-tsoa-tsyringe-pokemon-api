import axios from 'axios';
import { injectable, inject, singleton } from 'tsyringe';
import { PokemonService } from './pokemonService';

const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const limit = 1500;

@injectable()
@singleton()
export class PokemonFetcher {
  constructor(@inject(PokemonService) private pokemonService: PokemonService) {}

  async fetchPokemon() {
    try {
      const {
        data: { results },
      } = await axios.get(`${pokemonApiUrl}?offset=0&limit=${limit}`);

      await Promise.all(
        results.map(async (result: any) => {
          const { data } = await axios.get(result.url);
          try {
            await this.pokemonService.create({
              _id: data.id,
              name: data.name,
              abilities: data.abilities.map((ability: any) => ability.ability.name),
              baseExperience: data.base_experience,
              height: data.height,
              stats: data.stats.map((stat: any) => ({ name: stat.stat.name, baseStat: stat.base_stat })),
              types: data.types.map((type: any) => type.type.name),
              weight: data.weight,
            });
          } catch (err) {
            console.error(`Error storing pokemon id=${data.id} err=${err.message}`);
          }
        }),
      );

      console.info('Pokemon data fetched and stored successfully.');
    } catch (err) {
      console.error('Error fetching Pokemon data:', err);
      throw err;
    }
  }
}
