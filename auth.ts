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
	trustedOrigins: [
		process.env.BASE_APP_URL as string,
		process.env.LAN_IP as string,
	],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
});
