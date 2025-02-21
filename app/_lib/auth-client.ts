import { createAuthClient } from 'better-auth/react';

const getBaseURL = () => {
	if (typeof window !== 'undefined') {
		// Check the current origin to set the correct baseURL
		if (window.location.hostname === 'localhost') {
			return 'http://localhost:3000';
		}
	}
	return 'http://192.168.0.17:3000'; // Default to LAN IP
};

// auth client instance
export const authClient = createAuthClient({
	baseURL: getBaseURL(),
});
