import { gql } from 'apollo-server';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export const userSchemaGql = gql`
  type User {
    id: ID!
    email: String!
    username: String!
  }
`;

export const User = mongoose.model('User', UserSchema);
