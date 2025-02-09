import { generateId, Message } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { writeFile, readFile, readdir, unlink } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

const FOLDER_NAME = '.chats';

// generates the file path,creates folder if no folder
export function getChatFile(id: string): string {
	const chatDir = path.join(process.cwd(), FOLDER_NAME);
	if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
	return path.join(chatDir, `${id}.json`);
}

export async function createChat(): Promise<string> {
	const id = generateId();
	await writeFile(getChatFile(id), '[]');
	return id;
}

export async function loadChat(id: string): Promise<Message[]> {
	try {
		return JSON.parse(await readFile(getChatFile(id), 'utf8'));
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
	await writeFile(getChatFile(id), content);
}

// returns all chats in folder
export async function getAllChats() {
	try {
		const chatDir = path.join(process.cwd(), FOLDER_NAME);
		// list of all files in chat dir
		const allFiles = await readdir(chatDir);
		// console.log(allFiles);
		const allFilesParsed = await Promise.all(
			allFiles.map(async file => {
				// filepath for each file

				const filePath = path.join(chatDir, file);
				// ID of each chat
				const id = file.split('.')[0];
				// console.log('THIS IS ID', id);
				// console.log('filepath', filePath);
				// returns content of chats
				const chatContent = JSON.parse(await readFile(filePath, 'utf8'));
				// fitlering out the empty ones - WILL ADD DELETION
				if (chatContent.length) {
					return [{ chatId: id }, ...chatContent];
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
