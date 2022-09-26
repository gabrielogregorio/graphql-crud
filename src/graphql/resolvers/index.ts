import { QueryUser } from './queries/user';
import { MutationUser } from './mutations/user';

export default {
  Query: {
    ...QueryUser,
  },
  Mutation: {
    ...MutationUser,
  },
};
