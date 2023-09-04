import mongoose from 'mongoose';

export class MongoDB {
  private static _instance: MongoDB;
  private _isConnected: boolean;
  private _uri: string;

  private constructor() {
    this._uri = process.env.MONGO_URI || 'mongodb://localhost:27017/';
    this._isConnected = false;
  }

  public async connect() {
    try {
      await mongoose.connect(this._uri);
      console.log('Connected to MongoDB');
      this._isConnected = true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  public static getInstance(): MongoDB {
    if (!this._instance) {
      this._instance = new MongoDB();
    }
    return this._instance;
  }

  public async getConnectionStatus(): Promise<boolean> {
    return this._isConnected;
  }

  public async closeConnection(): Promise<void> {
    if (this._isConnected) {
      await mongoose.disconnect();
      this._isConnected = false;
      console.log('Disconnected from MongoDB');
    }
  }
}
