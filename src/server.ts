/* eslint-disable no-console */
import { DB_MONGO_URI } from './constants/envs';
import { server, mongoose } from '.';

export default mongoose
  .connect(DB_MONGO_URI)
  .then(() =>
    server.listen(4000, () =>
      console.log('Running a GraphQL API server at http://127.0.0.1:4000/graphql'),
    ),
  );
