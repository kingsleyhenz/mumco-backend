import Redis, { Cluster } from 'ioredis';
import config from '../config';
import generalLogger from '../lib/logger';

const { password, username, host, port, tls } = config.redis;

const extractedConfig = {
  password,
  username,
  tls:
    tls === 'yes'
      ? {
          requestCert: true,
          rejectUnauthorized: true,
        }
      : undefined,
  lazyConnect: true,
};

const redis =
  config.redis.mode === 'cluster'
    ? new Redis.Cluster(
        [
          {
            port,
            host,
          },
        ],
        {
          redisOptions: {
            ...extractedConfig,
          },
        }
      )
    : new Redis({
        port: config.redis.port,
        host: config.redis.host,
        ...extractedConfig,
      });

export const createRedisConnection = async () => {
  await redis.connect();
  generalLogger.info('connected to redis');
};

export default redis;
