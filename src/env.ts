import 'server-only';

type RequiredEnvKey =
  | 'DATABASE_URL'
  | 'REDIS_URL'
  | 'AUTH_SECRET'
  | 'AUTH_GITHUB_ID'
  | 'AUTH_GITHUB_SECRET';

type OptionalEnvKey = 'DEEPSEEK_API_KEY';

function getRequiredEnv(name: RequiredEnvKey) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getOptionalEnv(name: OptionalEnvKey) {
  const value = process.env[name]?.trim();

  return value ? value : undefined;
}

function getRequiredUrlEnv(name: 'DATABASE_URL' | 'REDIS_URL') {
  const value = getRequiredEnv(name);

  try {
    new URL(value);
  } catch {
    throw new Error(`Environment variable ${name} must be a valid URL.`);
  }

  return value;
}

export const env = {
  DATABASE_URL: getRequiredUrlEnv('DATABASE_URL'),
  REDIS_URL: getRequiredUrlEnv('REDIS_URL'),
  AUTH_SECRET: getRequiredEnv('AUTH_SECRET'),
  AUTH_GITHUB_ID: getRequiredEnv('AUTH_GITHUB_ID'),
  AUTH_GITHUB_SECRET: getRequiredEnv('AUTH_GITHUB_SECRET'),
  DEEPSEEK_API_KEY: getOptionalEnv('DEEPSEEK_API_KEY'),
} as const;
