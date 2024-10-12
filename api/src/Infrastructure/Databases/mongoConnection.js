import mongoose from 'mongoose';
import { config } from '../../Config/app.config.js';

export default class MongoConnection {
  static async connect() {
    mongoose.set('strictQuery', false);

    const mongoURI = config.storage.database.mongoURI;

    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined');
    }

    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 90000,
      socketTimeoutMS: 90000,
    });

    console.log('Successfully connected to MongoDB');
  }
}
