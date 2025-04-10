import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authenticateToken } from './services/auth.js';

// Load environment variables
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MONGODB_URI is not defined in the environment.');
  process.exit(1);  
}

const app = express();

// ✅ Fix CORS settings for GraphQL
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend URL
    credentials: true,
  })
);

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = authenticateToken(req); // Get user from token
        return { user }; // Provide user to resolvers
      },
    })
  );

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('📚 Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }

  // ✅ Fix Port Issue
  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:10000/graphql`);
  });
}

// Start the server
startServer();
