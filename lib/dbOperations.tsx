import { Documents, Prompts, Settings } from '@/db/schema';
import { verifySessionOrError } from './verifySessionServer';
import { Prompts as IPrompts } from '@/components/prompts/PromptsSearchAndDisplay';
import db from '@/db';
import { desc, eq } from 'drizzle-orm';

// PROMPTS
// get all prompts
export async function getAllPrompts(): Promise<IPrompts[]> {
	const userId = await verifySessionOrError();
	try {
		const result = await db
			.select()
			.from(Prompts)
			.where(eq(Prompts.userId, userId));
		return result;
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching prompts');
	}
}

// SETTINGS

export async function getAllSettings() {
	const userId = await verifySessionOrError();
	try {
		const [result] = await db
			.select()
			.from(Settings)
			.where(eq(Settings.userId, userId));
		return result;
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching settings');
	}
}

// DOCUMENTS
//get all documents
export async function getAllDocuments() {
	try {
		const userId = await verifySessionOrError();
		const documents = await db
			.select()
			.from(Documents)
			.where(eq(Documents.userId, userId))
			.orderBy(desc(Documents.createdAt));
		return documents;
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching documents');
	}
}
