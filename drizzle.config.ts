import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	out: './drizzle',
	schema: './db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
	},
	migrations: {
		schema: 'public',
	},
});
