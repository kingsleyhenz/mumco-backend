// import { getConnection } from 'typeorm';
import 'reflect-metadata';
import sinon from 'sinon';
import _ from 'lodash';

import initialize from '../src/initialize';
import { disconnectDB } from '../src/database';
// import { seedSomething } from '../src/scripts/script';
import Documentator from './documentator';
import definition from './documentator/config';

// stubs
sinon.stub(_, 'random').returns(12345);

// eslint-disable-next-line import/prefer-default-export
export const mochaHooks = {
  async beforeAll(): Promise<void> {
    await initialize();
    Documentator.start(definition);
    // await seedSomething();
  },

  async afterAll(): Promise<void> {
    Documentator.document();
    await disconnectDB();
  },
};
