import 'express-async-errors';
import { connectDB } from './database';
import { seedAdmin } from './database/seedAdmin';
import notFoundHandler from './middleware/application/notFoundHandler';
import errorHandler from './middleware/application/errorHandler';
import { createRedisConnection } from './database/redis';
import { generalLogger } from './lib/logger';

export default async () => {
  await createRedisConnection();
  await connectDB();
  await seedAdmin();
  generalLogger.info('admin user seed check completed');

  const app = (await import('./app')).default;
  const router = (await import('./router')).default;

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);
};
