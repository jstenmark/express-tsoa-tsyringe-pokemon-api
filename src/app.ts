import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { container } from 'tsyringe';

import errorMiddleware from './shared/middlewares/errorMiddleware';
import { MongoDBConnection } from './shared/databases/mongo';
import { RegisterRoutes } from '../tsoa/routes';
import { PokemonFetcher } from './domain/pokemon/pokemonFetcher';

const NODE_ENV = 'development';
const PORT = 3000;

const DB_HOST = '127.0.0.1';
const DB_PORT = 27017;
const DB_DATABASE = 'pokemon';
const MONGO_URI = process.env.MONGODB_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private dbConnection: MongoDBConnection;

  constructor() {
    this.app = express();
    this.env = NODE_ENV;
    this.port = PORT;
    this.dbConnection = new MongoDBConnection(MONGO_URI);
  }

  public async listen() {
    await this.dbConnection.connect();
    // await this.dbConnection.cleanUp();
    await this.fetchPokemonData();

    this.config();

    this.app.listen(this.port, () => {
      console.log(`API live on port ${this.port}!`);
    });
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    RegisterRoutes(this.app);
    this.initSwagger();

    this.app.use(errorMiddleware);
  }

  private async fetchPokemonData() {
    const pokemonFetcher = container.resolve(PokemonFetcher);
    await pokemonFetcher.fetchPokemon();
  }

  private async initSwagger() {
    const options = {
      explorer: true,
      customSiteTitle: 'Pokemon API',
      customfavIcon: 'https://www.google.com/s2/favicons?domain=https://pokeapi.co',
      customSiteDescription: 'Pokemon API',
      swaggerUrl: 'http://172.24.60.47:3000/swagger.json',
      customCssUrl: 'https://unpkg.com/swagger-ui-dist@3/swagger-ui.css',
      customJsUrl: 'https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js',
    };
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(await import('../tsoa/swagger.json'), options));
  }
}

export default App;
