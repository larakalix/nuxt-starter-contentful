import { z } from 'zod';

const { ENV, VERSION, PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN } =
  process.env;

const envSchema = z.object({
  ENV: z.enum(['development', 'production', 'test']).default('development'),
  VERSION: z.string().default('1.0.0'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z
    .string()
    .url()
    .default('postgres://postgres:6372@localhost:5432/booq_dev'),
  JWT_SECRET: z.string().default('your_jwt_secret'),
  // JWT_EXPIRES_IN - 1 day default
  JWT_EXPIRES_IN: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(86400),
});

const env = envSchema.safeParse({
  ENV,
  VERSION,
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
});

if (!env.success) {
  console.error('💥 Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

export const envConfig = {
  env: env.data.ENV || 'development',
  version: env.data.VERSION || '1.0.0',
  port: env.data.PORT || 3000,
  databaseUrl:
    env.data.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb',
  jwtSecret: env.data.JWT_SECRET || '7WhcTxc2rih9J2ZjK2nrS3XZ5saNKmth',
  jwtExpiresIn: env.data.JWT_EXPIRES_IN || 86400,
};

export type EnvConfig = typeof envConfig;
