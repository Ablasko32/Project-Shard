'use server';
import { generateId, Message } from 'ai';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import db from '@/db';
import { Chats } from '@/db/schema';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { verifySessionOrError } from '@/lib/verifySessionServer';

// create chat
export async function createChat(): Promise<string> {
	const id = generateId();

	const userId = await verifySessionOrError();

	try {
		await db.insert(Chats).values({ id, userId });

		return id;
	} catch (err) {
		console.error(err);
		throw new Error('Error creating chat');
	}
}

// load chat by ID
export async function loadChat(id: string) {
	try {
		const [chat] = await db
			.select()
			.from(Chats)
			.where(eq(Chats.id, id))
			.limit(1);

		if (!chat) throw new Error();
		return chat.messages ?? [];
	} catch (err) {
		console.error(err);
		notFound();
	}
}

// Save chat messages
export async function saveChat({
	id,
	messages,
}: {
	id: string;
	messages: Message[];
}): Promise<void> {
	try {
		await db.update(Chats).set({ messages }).where(eq(Chats.id, id));
	} catch (err) {
		console.log(err);
		throw new Error('Error saving chat');
	}
}

// Get all chats from DB and delete empty ones on fetch
export async function getAllChats() {
	const userId = await verifySessionOrError();

	try {
		// delete empty chats and fetch chats
		await db
			.delete(Chats)
			.where(and(isNull(Chats.messages), eq(Chats.userId, userId)));
		const chats = await db
			.select()
			.from(Chats)
			.where(eq(Chats.userId, userId))
			.orderBy(desc(Chats.createdAt));
		return chats;
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching chats');
	}
}

// delete chat by chatId
export async function deleteChat(id: string) {
	try {
		await db.delete(Chats).where(eq(Chats.id, id));
		revalidatePath('/chat/all-chats');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting chat');
	}
}

// delete all chats
export async function deleteAllChats() {
	// getting the session
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	// if not auth throw error
	if (!session) throw new Error('You need to login first');
	const userId = session.user.id; // getting the user id from the session

	try {
		await db.delete(Chats).where(eq(Chats.userId, userId));
		revalidatePath('/chats/all-chats');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting all chats');
	}
}
