import { createAuthClient } from 'better-auth/react';

// auth client instance
export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000',
});
