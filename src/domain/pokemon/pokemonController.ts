import { Body, Controller, Get, Path, Post, Patch, Delete, Query, Route, SuccessResponse, Tags, Response } from 'tsoa';

import { Pokemon } from './model/pokemon.schema';
import { PokemonService } from './pokemonService';
import { CreatePokemonDto } from './dto/createPokemon.dto';
import { UpdatePokemonDto } from './dto/updatePokemon.dto';

import { injectable, inject } from 'tsyringe';
import { HttpException } from '../../shared/exceptions/HttpException';

@injectable()
@Tags('Pokemon')
@Route('pokemon')
export class PokemonController extends Controller {
  constructor(@inject(PokemonService) private pokemonService: PokemonService) {
    super();
  }

  @Get('{pokemonId}')
  @SuccessResponse('200', 'OK')
  @Response(404, 'Not Found')
  public async getPokemon(@Path() pokemonId: number): Promise<Pokemon> {
    const pokemon = await this.pokemonService.get(pokemonId);
    if (!pokemon) {
      throw new HttpException(404, 'Pokemon not found');
    }
    return pokemon;
  }

  @Post()
  @SuccessResponse('201', 'Created')
  @Response(400, 'Bad Request')
  @Response(409, 'Conflict')
  public async createPokemon(@Body() requestBody: CreatePokemonDto): Promise<Pokemon> {
    const createdPokemon = await this.pokemonService.create(requestBody);
    this.setStatus(201);
    return createdPokemon;
  }

  @Get()
  @SuccessResponse('200', 'OK')
  @Response(500, 'Internal Server Error')
  public async getAllPokemon(
    @Query() page?: number,
    @Query() perPage?: number,
  ): Promise<{ pokemons: Pokemon[]; totalPages: number }> {
    this.setStatus(200);
    return await this.pokemonService.getAll(page, perPage);
  }

  @Patch('{pokemonId}')
  @Response(404, 'Not Found')
  @Response(400, 'Bad Request')
  public async updatePokemon(@Path() pokemonId: number, @Body() requestBody: UpdatePokemonDto): Promise<Pokemon> {
    const updatedPokemon = await this.pokemonService.update(pokemonId, requestBody);
    if (!updatedPokemon) {
      throw new HttpException(404, 'Pokemon not found');
    }
    return await this.pokemonService.get(pokemonId);
  }

  @Delete('{pokemonId}')
  @SuccessResponse('204', 'No Content')
  @Response(404, 'Not Found')
  public async deletePokemon(@Path() pokemonId: number): Promise<void> {
    const deleted = await this.pokemonService.delete(pokemonId);
    if (!deleted) {
      throw new HttpException(404, 'Pokemon not found');
    }
    this.setStatus(204);
  }
}
