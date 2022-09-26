import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  cache: 'bounded',
  cors: true,
});

export { mongoose };
