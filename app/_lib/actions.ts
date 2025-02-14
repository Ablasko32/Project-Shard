'use server';
import { Prompts, Settings } from '@/dbModels';
import { revalidatePath } from 'next/cache';
import { Prompts as IPrompts } from '@/app/_components/PromptsSearchAndDisplay';
import { Settings as ISettings } from '../_components/SettingsForm';
import pdfParse from 'pdf-parse';
import path from 'path';
import fs from 'fs/promises';
import mammoth from 'mammoth';
import {
	bulkInsertEmbeddings,
	chunkUpText,
	generateEmbedding,
} from '@/helpers/textProcessing';

// revalidate a path
export async function revalidatePathAction(path: string) {
	revalidatePath(path);
}

//PROMPTS

// get all prompts
export async function getAllPrompts(): Promise<IPrompts[]> {
	try {
		const results = await Prompts.findAll();
		return results.map(res => res.toJSON());
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching prompts');
	}
}

// Aadd new prompt
export async function addNewPrompt(formData: FormData): Promise<void> {
	const prompt = formData.get('prompt');
	const title = formData.get('title');
	if (!prompt || !title) throw new Error('Invalid form data');
	try {
		await Prompts.create({
			title: title.slice(0, 200),
			content: prompt.slice(0, 1000),
		});
		revalidatePath('/prompts');
	} catch (err) {
		console.error(err);
		throw new Error('Error adding new prompt');
	}
}

// delete prompt
export async function deletePrompt(id: number): Promise<void> {
	try {
		await Prompts.destroy({ where: { id } });
		revalidatePath('/prompts');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting prompt');
	}
}

// SETTINGS

// get all settings
export async function getAllSettings(): Promise<ISettings> {
	try {
		const results = await Settings.findOne();

		return results?.toJSON();
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching settings');
	}
}

// create or update settings
export async function updateSettings(formData: FormData): Promise<void> {
	const username = formData.get('username')?.slice(0, 100) as string;
	const system = formData.get('system')?.slice(0, 1000) as string;
	console.log('IM HERE', system, username);
	try {
		const settings = await Settings.findAll();
		if (!settings.length) {
			await Settings.create({ username, system });
		} else {
			await Settings.update(
				{ username: username, system: system },
				{ where: { id: 1 } }
			);
		}
		revalidatePath('/settings');
	} catch (err) {
		console.error(err);
		throw new Error('Error updating settings');
	}
}

// DOCUMENTS

const DOCUMENT_FOLDER = '.documents';

export async function uploadFile(formData: FormData) {
	try {
		const file = formData.get('file') as File;
		if (!file) {
			throw new Error('No file provided');
		}

		// file name contructions
		const fileName = file.name;
		const fileExtension = ('.' + fileName.split('.').pop()) as string;
		if (!['.txt', '.pdf', '.docx'].includes(fileExtension))
			throw new Error('Invalid file type');

		// upload raw file store to disk in DOCUMENT_FOLDER
		const documentFolder = path.join(process.cwd(), `/${DOCUMENT_FOLDER}`);
		const filePath = path.join(documentFolder, fileName);

		// check to see if file is already processed and exits in .documents
		try {
			await fs.access(filePath);
			// if no error then exists
			console.log('FILE EXISTS SKIPPING...');
			return;
		} catch (err) {}

		// buffer from file
		const fileArray = await file.arrayBuffer();
		const fileBuffer: Buffer = Buffer.from(fileArray);
		// create directory if not exists
		await fs.mkdir(documentFolder, { recursive: true });
		// write file buffer
		await fs.writeFile(filePath, fileBuffer);

		// parse text
		let extractedRawText: string = '';
		switch (fileExtension) {
			// raw text simply extract
			case '.txt': {
				extractedRawText = await file.text();
				break;
			}
			// parse with pdf parse extrat text
			case '.pdf': {
				const pdfData = await pdfParse(fileBuffer);
				extractedRawText = pdfData.text;
				break;
			}
			// extract from word via mammoth
			case '.docx': {
				const wordData = await mammoth.extractRawText({ buffer: fileBuffer });
				extractedRawText = wordData.value;
				break;
			}
		}

		// Chunk up text in smaller chunks using langcahin text splitters
		const chunkedText = await chunkUpText(extractedRawText);
		// console.log(chunkedText);

		// embedd text chunks using ollama model
		const embeddings = await generateEmbedding(chunkedText);
		// insert embeddings and chunks to database
		await bulkInsertEmbeddings(chunkedText, embeddings);
	} catch (err) {
		console.error(err);
		throw new Error('Error uploading file');
	}
}
