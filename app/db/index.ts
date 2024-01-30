import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

export { db, sql };
