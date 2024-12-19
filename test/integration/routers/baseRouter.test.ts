import { assert } from 'chai';
import supertest from 'supertest';

import app from '../../../src/app';

const server = supertest.agent(app);

describe('Base Router', () => {
  describe('Version', () => {
    it('should fetch app version', async () => {
      const res = await server.get('/version');

      assert.equal(res.status, 200);
    });
  });

  describe('Health Check', () => {
    it('should call health check endpoint', async () => {
      const res = await server.get('/healthz');

      assert.equal(res.status, 200);
    });

    it('should call readiness check endpoint', async () => {
      const res = await server.get('/readyz');

      assert.equal(res.status, 200);
    });
  });
});
