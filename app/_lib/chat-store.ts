'use server';
import { generateId, Message } from 'ai';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import db from '@/db';
import { Chats } from '@/db/schema';
import { desc, eq, inArray } from 'drizzle-orm';

// create chat
export async function createChat(): Promise<string> {
	const id = generateId();

	try {
		await db.insert(Chats).values({ id });

		return id;
	} catch (err) {
		console.error(err);
		throw new Error('Error creating chat');
	}
}

// load chat by ID
export async function loadChat(id: string): Promise<Message[]> {
	try {
		const [chat] = await db
			.select()
			.from(Chats)
			.where(eq(Chats.id, id))
			.limit(1);

		// const chat = (await Chats.findByPk(id)) as unknown as Chat | null;
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
	try {
		const chats = await db.select().from(Chats).orderBy(desc(Chats.createdAt));
		console.log(chats);

		// Delete empty chats
		const idsToDelete = chats
			.map(chat => {
				if (!chat.messages || !String(chat.messages).length)
					return chat.id as string;
			})
			.filter(Boolean);

		await db.delete(Chats).where(inArray(Chats.id, idsToDelete));

		// returns only valid messages
		return chats
			.filter(chat => (chat.messages ? chat : undefined))
			.filter(Boolean);
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
	try {
		await db.delete(Chats);
		revalidatePath('/chats/all-chats');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting all chats');
	}
}
