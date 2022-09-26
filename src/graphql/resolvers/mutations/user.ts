import { User } from '@/models/User';
import { gql } from 'apollo-server';
import bcrypt from 'bcrypt';

export const MutationUser = {
  createUser: async (_, { registerInput: { username, email, password } }) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hash,
      createdAt: new Date().toISOString(),
    });

    const res = await newUser.save();

    return {
      id: res.id,
    };
  },

  deleteUser: async (_, { id }) => User.deleteOne({ _id: id }),
};

export const mutationUsersGql = gql`
  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  type deleteUserType {
    deletedCount: Int
  }

  type Mutation {
    createUser(registerInput: RegisterInput): User!
    deleteUser(id: ID!): deleteUserType!
  }
`;
