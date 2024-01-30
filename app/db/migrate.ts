// import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, sql } from '.';

async function main() {
  await migrate(db, { migrationsFolder: 'app/db/migrations' });
  await sql.end();
}

main();

