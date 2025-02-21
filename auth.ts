import db from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { user, session, account, verification } from '@/db/schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: { user, session, account, verification },
	}),
	emailAndPassword: { enabled: true },
	trustedOrigins: ['http://localhost:3000', 'http://192.168.0.17:3000'],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
});
