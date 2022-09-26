import { User } from '@/models/User';
import { gql } from 'apollo-server';

export const QueryUser = {
  async getUsers() {
    return User.find().sort({ createdAt: -1 });
  },

  async getUser(_, { id }) {
    return User.findById(id);
  },
};

export const queryUserGql = gql`
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
`;
