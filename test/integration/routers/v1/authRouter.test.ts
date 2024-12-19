import { assert } from 'chai';
import supertest from 'supertest';
import faker from 'faker';

import app from '../../../../src/app';
import Documentator from '../../../documentator';

const server = supertest.agent(app);
const userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';

const docmaker: Documentator = Documentator.getInstance();

describe('Auth Router', () => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  let token: string;

  describe('Register', () => {
    it('should return an error if any required fields are absent', async () => {
      const res = await server.post('/v1/auth/register').set('User-Agent', userAgent).send({});

      assert.equal(res.status, 422);
    });

    it('should register if all fields are present', async () => {
      const res = await server
        .post('/v1/auth/register')
        .set('User-Agent', userAgent)
        .send({
          email,
          password,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        });

      assert.equal(res.status, 200);
      docmaker.addEndpoint(res, {
        tags: ['Auth'],
      });
    });
  });

  describe('Login', () => {
    it('should return an error if any required fields are absent', async () => {
      const res = await server.post('/v1/auth/login').set('User-Agent', userAgent).send({});

      assert.equal(res.status, 422);
    });

    it('should not login with invalid credentials', async () => {
      const res = await server.post('/v1/auth/login').set('User-Agent', userAgent).send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      assert.equal(res.status, 400);
      assert.include(res.body.message, 'not correct');
    });

    it('should login with valid credentials', async () => {
      const res = await server.post('/v1/auth/login').set('User-Agent', `${userAgent}`).send({
        email,
        password,
      });

      assert.equal(res.status, 200);
      assert.exists(res.body.data.user);
      assert.exists(res.body.data.token);

      token = res.body.data.token;

      docmaker.addEndpoint(res, {
        tags: ['Auth'],
      });
    });

    it('should return user details with valid token', async () => {
      const res = await server.get('/v1/auth/user').set('Authorization', `Bearer ${token}`).send();

      assert.equal(res.status, 200);
      assert.exists(res.body.data.id);

      docmaker.addEndpoint(res, {
        tags: ['Auth'],
      });
    });
  });
});
