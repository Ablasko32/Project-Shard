import { auth } from '@/auth';
import { headers } from 'next/headers';

// verify session server side and return userId if valid
export async function verifySessionOrError(): Promise<string> {
	try {
		// getting the session
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		// if not auth throw error
		if (!session) throw new Error('You need to login first');
		return session.user.id; // getting the user id from the session
	} catch (err) {
		console.error('Auth_Error', err);
		throw new Error('Auth error');
	}
}
