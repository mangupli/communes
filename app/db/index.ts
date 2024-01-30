import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found in .env');

const connectionString = process.env.DATABASE_URL!;

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

export { db, sql };
