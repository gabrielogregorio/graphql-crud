import dotenv from 'dotenv';
import request from 'supertest';
import { mongoose as connection, server } from '../index';
import { DB_MONGO_URI } from '../constants/envs';

const baseUrl = 'http://localhost:4009/graphql';

dotenv.config();

beforeAll(async () => {
  await connection.connect(DB_MONGO_URI).catch((error) => error);
  await server.listen(4009);
});

afterAll(async () => {
  await connection.connection.close();
  await server.stop();
});

describe('<Preferences />', () => {
  let userId = null;
  const userName = 'test any user';
  const email = 'greg@geg.com';
  const password = '22131';

  it('should create  users', async () => {
    const queryData = {
      query: `mutation {
        createUser(registerInput: {username: "${userName}" email: "${email}" password: "${password}"}) {
          id
        }
      }`,
    };

    const response = await request(baseUrl).post('/').send(queryData);
    userId = response.body.data.createUser.id;

    expect(userId).toBeDefined();
  });

  it('should return one user', async () => {
    const queryData = {
      query: `query {
        getUser(id: "${userId}") {
          id,
          username,
          email
        }
      }`,
    };

    const response = await request(baseUrl).post('/').send(queryData);
    const bodyRequest = response.body.data.getUser;

    expect(bodyRequest.username).toEqual(userName);
    expect(bodyRequest.email).toEqual(email);
    expect(bodyRequest.id).toBeDefined();
  });

  it('should return all users', async () => {
    const queryData = {
      query: `query {
        getUsers {
          id,
          username,
          email
        }
      }`,
    };

    const response = await request(baseUrl).post('/').send(queryData);
    const bodyRequest = response.body.data.getUsers;

    expect(bodyRequest[bodyRequest.length - 1].id.toString()).toEqual(userId);
  });

  it('should delete users', async () => {
    const queryData = {
      query: `mutation {
        deleteUser(id: "${userId}") {
          deletedCount
        }
      }`,
    };

    const response = await request(baseUrl).post('/').send(queryData);

    expect(response.body.data.deleteUser.deletedCount).toEqual(1);
  });
});
