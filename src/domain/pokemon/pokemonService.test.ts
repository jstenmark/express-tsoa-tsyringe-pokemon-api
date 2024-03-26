import 'reflect-metadata';
import { PokemonService } from './pokemonService';
import { Pokemon } from './model/pokemon.schema';

const mockPokemonModel = {
  countDocuments: jest.fn().mockResolvedValue(0),
  find: jest.fn(),
};

describe('PokemonService', () => {
  let pokemonServiceMock: PokemonService;

  beforeEach(() => {
    pokemonServiceMock = jest.createMockFromModule<PokemonService>('./pokemonService');
    jest.mock('./pokemonService', () => ({
      __esModule: true,
      ...jest.requireActual('./pokemonService'),
      PokemonService: pokemonServiceMock,
    }));
  });

  it('should return pokemons with pagination', async () => {
    const mockPokemons: Pokemon[] = [
      { _id: 1, name: 'Bulbasaur', abilities: [], baseExperience: 1, height: 1, stats: [], types: [], weight: 1 },
      { _id: 2, name: 'Pikachu', abilities: [], baseExperience: 2, height: 2, stats: [], types: [], weight: 2 },
    ];
    pokemonServiceMock.getAll = jest.fn().mockResolvedValue({ pokemons: mockPokemons, totalPages: 1 });

    jest.spyOn(mockPokemonModel, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockPokemons),
    });

    const result = await pokemonServiceMock.getAll();

    expect(result.pokemons).toEqual(mockPokemons);

    expect(result.totalPages).toBe(1);
  });
});
