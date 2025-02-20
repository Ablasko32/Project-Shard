import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth';

// protects routes by redirecting to login page if user is not authenticated
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	// redirect to profile if no session cookie
	if (!sessionCookie) {
		return NextResponse.redirect(new URL('/profile', request.url));
	}
	return NextResponse.next();
}

// on what routes will it apply?
export const config = {
	matcher: [
		'/models',
		'/chat',
		'/settings',
		'/documents',
		'/prompts',
		'/chat/all-chats',
	],
};
