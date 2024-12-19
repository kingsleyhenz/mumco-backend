import Redis from 'ioredis';
declare const redis: Redis.Cluster | Redis.Redis;
export default redis;
