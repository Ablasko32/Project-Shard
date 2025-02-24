import { createAuthClient } from 'better-auth/react';

const getBaseURL = () => {
	if (typeof window !== 'undefined') {
		// Check the current origin to set the correct baseURL
		if (window.location.hostname === 'localhost') {
			return process.env.BASE_APP_URL as string;
		}
	}
	return process.env.LAN_IP as string; // Default to LAN IP
};

// auth client instance
export const authClient = createAuthClient({
	baseURL: getBaseURL(),
});
