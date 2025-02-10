import 'express-async-errors';
import {connectDB} from './database';
import notFoundHandler from './middleware/application/notFoundHandler';
import errorHandler from './middleware/application/errorHandler';
import { createRedisConnection } from './database/redis';

export default async () => {
  await createRedisConnection();
  await connectDB();

  const app = (await import('./app')).default;
  const router = (await import('./router')).default;

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);
};
