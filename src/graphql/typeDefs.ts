import { userSchemaGql } from '../models/User';
import { mutationUsersGql } from './resolvers/mutations/user';
import { queryUserGql } from './resolvers/queries/user';

export default [userSchemaGql, queryUserGql, mutationUsersGql];
