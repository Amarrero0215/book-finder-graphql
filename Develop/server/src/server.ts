import express from 'express';
import cors from 'cors'; // Import CORS middleware
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth-service';
import { typeDefs, resolvers } from './schemas/index';
import db from './config/connection';

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// CORS Middleware
app.use(cors({
  origin: ['https://book-finder-graphql-frontend.onrender.com'],
  credentials: true,
}));

// Apollo Server middleware
const startApolloServer = async () => {
  await server.start();
  await db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Use Apollo Server as middleware for GraphQL endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const context = await authenticateToken({ req });  // Wrap authenticateToken in async function
      return context;  // Return the context that should be injected into resolvers
    },
  }));

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
    console.log(`📡 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
