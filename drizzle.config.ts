import { defineConfig } from 'drizzle-kit';

// drizzle config for migrations
export default defineConfig({
	out: './drizzle',
	schema: './db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
	migrations: {
		schema: 'public',
	},
});
