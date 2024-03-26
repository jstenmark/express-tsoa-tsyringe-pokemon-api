import * as mongoose from 'mongoose';

export class MongoDBConnection {
  private readonly mongoURI: string;
  private dbConnection: any;

  constructor(mongoURI: string) {
    this.mongoURI = mongoURI;
  }

  public async connect(): Promise<mongoose.Connection> {
    try {
      mongoose.set('debug', true);
      this.dbConnection = await mongoose.connect(`${this.mongoURI}`);

      if (this.dbConnection) {
        console.info(`MongoDB connected`);
        return mongoose.connection;
      }

      throw new Error(`MongoDB Connection error`);
    } catch (error: any) {
      console.error(`MongoDB Connection error`);
      throw new Error(error);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.dbConnection) {
      this.dbConnection.disconnect();
    }
  }

  public async cleanUp(): Promise<void> {
    const collections = await this.dbConnection.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
}
