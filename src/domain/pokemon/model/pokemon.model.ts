import { model } from 'mongoose';

import { PokemonI, PokemonSchema } from './pokemon.schema';

export default model<PokemonI>('Pokemon', PokemonSchema);
