import db from '@/db';
import { Settings } from '@/db/schema';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { eq } from 'drizzle-orm';

// get api key from DB
export async function getApiKey(userId: string) {
	const [settings] = await db
		.select()
		.from(Settings)
		.where(eq(Settings.userId, userId))
		.limit(1);
	console.log('settings', settings);

	const apiKey: string = settings.key ?? '';
	console.log('API EKY ', apiKey);

	return apiKey;
}

// CREATE CLIENT for open router
export function createOpenRouterClient(apiKey: string) {
	return createOpenRouter({
		apiKey: apiKey,
	});
}
