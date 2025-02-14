'use server';
import { generateId, Message } from 'ai';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Chats } from '@/dbModels';
import { Chat } from '@/app/_components/IndividualChat';

// create chat
export async function createChat(): Promise<string> {
	const id = generateId();

	try {
		await Chats.create({ id });
		return id;
	} catch (err) {
		console.error(err);
		throw new Error('Error creating chat');
	}
}

// load chat by ID
export async function loadChat(id: string): Promise<Message[]> {
	try {
		const chat = (await Chats.findByPk(id)) as unknown as Chat | null;
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
		await Chats.update({ messages }, { where: { id: id } });
	} catch (err) {
		console.log(err);
		throw new Error('Error saving chat');
	}
}

// Get all chats from DB and delete empty ones on fetch
export async function getAllChats() {
	try {
		const chats = (await Chats.findAll()) as unknown as Chat[];
		const messages = chats.map(chat =>
			chat.messages ? chat.toJSON() : undefined
		);

		// Delete empty chats
		const idsToDelete = chats
			.map(chat => {
				if (!chat.messages || !chat.messages.length) return chat.id;
			})
			.filter(Boolean);

		// console.log('IDSTODESTROY', idsToDelete);
		await Chats.destroy({ where: { id: idsToDelete } });

		// returns only valid messages
		return messages.filter(Boolean);
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching chats');
	}
}

// delete chat by chatId
export async function deleteChat(id: string) {
	try {
		await Chats.destroy({ where: { id } });
		revalidatePath('/chat/all-chats');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting chat');
	}
}

// delete all chats
export async function deleteAllChats() {
	try {
		await Chats.destroy({ where: {} });
		revalidatePath('/chats/all-chats');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting all chats');
	}
}
