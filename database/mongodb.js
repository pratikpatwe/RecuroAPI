import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI){
  throw new Error('DB_URI is not provided');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to database: ${NODE_ENV} mode`);
  } catch (error) {
  console.error(`Error connecting to database: ${error}`);
  process.exit(1);
  }
}

export default connectToDatabase;