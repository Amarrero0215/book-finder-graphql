import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Make sure to load environment variables from .env
dotenv.config();

console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/googlebooks')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

export default mongoose.connection;

