import { createClient } from 'redis';
import { env } from '@/src/env';

export const redis = await createClient({
  url: env.REDIS_URL,
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect();
