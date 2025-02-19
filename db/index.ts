import { drizzle } from 'drizzle-orm/node-postgres';

const POSTGRES_URL = process.env.POSTGRES_URL as string;

if (!POSTGRES_URL) throw new Error('DB_error: Postgres url is required!');

const db = drizzle(POSTGRES_URL);

export default db;
