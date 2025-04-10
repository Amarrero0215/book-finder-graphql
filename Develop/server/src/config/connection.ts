import type { Connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/googlebooks');

const db: Connection = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
    console.log('✅ MongoDB connected successfully');
    });

export default db;
