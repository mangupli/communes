import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found in .env');

export default {
  schema: './app/db/schema.ts',
  out: './app/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
