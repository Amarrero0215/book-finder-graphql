import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import IUserContext from '../interfaces/UserContext';  // Default import since it's a default export
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

export const authenticateToken = ({ req }: { req: Request }): IUserContext => {
  // Extract the token from request headers, query, or body
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If authorization header exists, remove "Bearer " prefix
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return { user: null }; // If no token, return an empty user context
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });

    // TypeScript knows decoded is a JwtPayload type because of the type assertion
    const data = decoded as JwtPayload;
    return { user: data }; // Return decoded user info as the context
  } catch (err) {
    console.log('Invalid token');
    return { user: null }; // If token is invalid, return empty context
  }
};

// Sign a new token (used for login/signup)
export const signToken = (username: string, email: string, _id: string) => {
  const payload: JwtPayload = { username, email, _id }; // Ensure correct typing

  // Return the signed JWT token
  const secretKey: string = process.env.JWT_SECRET_KEY || '';
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

// Custom AuthenticationError for GraphQL
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
