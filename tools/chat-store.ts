'use server';
import { generateId, Message } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { writeFile, readFile, readdir, unlink } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const FOLDER_NAME = '.chats';

// generates the file path,creates folder if no folder
export async function getChatFile(id: string): Promise<string> {
	const chatDir = path.join(process.cwd(), FOLDER_NAME);
	if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
	return path.join(chatDir, `${id}-${new Date().toLocaleDateString()}%.json`);
}

export async function createChat(): Promise<string> {
	const id = generateId();
	await writeFile(await getChatFile(id), '[]');
	return id;
}

export async function loadChat(id: string): Promise<Message[]> {
	try {
		return JSON.parse(await readFile(await getChatFile(id), 'utf8'));
	} catch (err) {
		console.error(err);
		notFound();
	}
}

// saves chat to file
export async function saveChat({
	id,
	messages,
}: {
	id: string;
	messages: Message[];
}): Promise<void> {
	const content = JSON.stringify(messages, null, 2);
	await writeFile(await getChatFile(id), content);
}

// returns all chats in folder
export async function getAllChats() {
	try {
		const chatDir = path.join(process.cwd(), FOLDER_NAME);
		// list of all files in chat dir
		const allFiles = await readdir(chatDir);

		const allFilesParsed = await Promise.all(
			allFiles.map(async file => {
				// filepath for each file

				const filePath = path.join(chatDir, file);
				// ID of each chat
				const [id, date] = file.split('%')[0].split('-');

				// returns content of chats
				const chatContent = JSON.parse(await readFile(filePath, 'utf8'));
				// fitlering out the empty ones - WILL ADD DELETION
				if (chatContent.length) {
					return [{ chatId: id, chatDate: date }, ...chatContent];
				} else {
					// deleting empty files on page visit
					await unlink(filePath);
					return null;
				}
			})
		);
		return allFilesParsed.filter(Boolean);
	} catch (err) {
		console.error(err);
		throw new Error('Error loading chats');
	}
}

// delete chat by chatId
export async function deleteChat(id: string) {
	const chatDir = path.join(process.cwd(), FOLDER_NAME);
	try {
		// list of all files in chat dir
		const allFiles = await readdir(chatDir);
		// targeting file to delete
		const targetFile = allFiles.filter(file => file.startsWith(id))[0];
		if (!targetFile) throw new Error('No target file found');

		const deletePath = path.join(chatDir, targetFile);

		await unlink(deletePath);
		revalidatePath('/chat/all-chats');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting file');
	}
}
