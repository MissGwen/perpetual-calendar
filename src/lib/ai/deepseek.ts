import { createDeepSeek } from '@ai-sdk/deepseek';
import { env } from '@/src/env';

export const deepseek = createDeepSeek({
  apiKey: env.DEEPSEEK_API_KEY ?? '',
});
