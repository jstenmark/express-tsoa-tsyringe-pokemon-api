import 'reflect-metadata';
import { PokemonFetcher } from './pokemonFetcher';
import { PokemonService } from './pokemonService';

jest.mock('axios');

describe('PokemonFetcher', () => {
  let pokemonFetcher: PokemonFetcher;
  let pokemonServiceMock: PokemonService;

  beforeEach(() => {
    pokemonServiceMock = jest.createMockFromModule<PokemonService>('./pokemonService');
    pokemonFetcher = new PokemonFetcher(pokemonServiceMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('fetches and stores pokemon data', async () => {
    const axios = require('axios');
    pokemonServiceMock.create = jest.fn().mockResolvedValue({ _id: 1, name: 'bulbasaur' });
    jest.mock('./pokemonService', () => ({
      __esModule: true,
      ...jest.requireActual('./pokemonService'),
      PokemonService: pokemonServiceMock,
    }));

    axios.get.mockResolvedValueOnce({
      data: {
        results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/' }, { url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
      },
    });

    axios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        name: '1',
        abilities: [],
        base_experience: 0,
        height: 0,
        stats: [],
        types: [],
        weight: 0,
      },
    });

    axios.get.mockResolvedValueOnce({
      data: {
        id: 2,
        name: '2',
        abilities: [],
        base_experience: 0,
        height: 0,
        stats: [],
        types: [],
        weight: 0,
      },
    });

    await pokemonFetcher.fetchPokemon();

    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(pokemonServiceMock.create).toHaveBeenCalledTimes(2);
  });

  it('handles errors', async () => {
    const axios = require('axios');
    axios.get.mockRejectedValueOnce(new Error('API ERROR'));

    await expect(pokemonFetcher.fetchPokemon()).rejects.toThrow('API ERROR');
  });
});
