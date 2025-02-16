'use server';
import {
	Documents,
	Embeddings,
	Prompts,
	sequelize,
	Settings,
} from '@/dbModels';
import { revalidatePath } from 'next/cache';
import { Prompts as IPrompts } from '@/app/_components/PromptsSearchAndDisplay';
import { Settings as ISettings } from '@/app/_components/SettingsForm';
import pdfParse from 'pdf-parse';
import path from 'path';
import fs from 'fs/promises';
import mammoth from 'mammoth';
import {
	bulkInsertEmbeddings,
	chunkUpText,
	generateEmbedding,
	generateQueryEmbedding,
} from '@/helpers/textProcessing';
import { generateText } from 'ai';
import { ollama } from './ollamaClient';

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

const DOCUMENT_FOLDER = '.documents' as string;
const SAVE_RAW_DOCUMENT_LOCAL = process.env.SAVE_RAW_DOCUMENT_LOCAL === 'true';
// SAVE Document metadata to database, embedd text and save to embeddings
export async function uploadFile(formData: FormData) {
	try {
		const file = formData.get('file') as File;
		if (!file) {
			throw new Error('No file provided');
		}

		// name and size from uploaded file
		const { size, name } = file;

		// // file name contructions
		const fileName = file.name;
		const fileExtension = ('.' + fileName.split('.').pop()) as string;
		if (!['.txt', '.pdf', '.docx'].includes(fileExtension))
			throw new Error('Invalid file type');

		// does document exist in db, store document metadata for reference
		const doesDocumentExist = await Documents.findOne({
			where: { name: name },
		});
		if (doesDocumentExist) {
			throw new Error('This document already exists');
		}
		const createdDocument = await Documents.create({
			name,
			size,
			extension: fileExtension,
		});

		// buffer from file
		const fileArray = await file.arrayBuffer();
		const fileBuffer: Buffer = Buffer.from(fileArray);

		// // upload raw file store to disk in DOCUMENT_FOLDER if SAVE_RAW_DOCUMENT_LOCAL is true
		if (SAVE_RAW_DOCUMENT_LOCAL) {
			const documentFolder = path.join(process.cwd(), `/${DOCUMENT_FOLDER}`);
			const filePath = path.join(documentFolder, fileName);

			try {
				await fs.mkdir(documentFolder, { recursive: true });
				// write file buffer
				await fs.writeFile(filePath, fileBuffer);
			} catch (err) {
				console.error(err);
				throw new Error('Error writing file locally');
			}
		}

		try {
			// parse document
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
			await bulkInsertEmbeddings(chunkedText, embeddings, createdDocument.id);
		} catch (err) {
			console.error(err);
			throw new Error('Error embedding document');
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error('Error uploading file');
		}
	}
}

// RAG TEST- used for testing rag only
export async function ragTest() {
	const userQuery = 'How to use tools in vercel ai sdk';
	const queryEmbedding = await generateQueryEmbedding(userQuery);
	// console.log(queryEmbedding);
	console.log('STARTING RAG TEST...');

	const formattedEmbedding = `[${queryEmbedding.join(',')}]`;
	const [results] = await sequelize.query(
		'SELECT embeddings.chunk,documents.name , embedding <#> CAST(? AS vector) AS distance FROM embeddings JOIN documents ON embeddings."documentId"=documents.id  ORDER BY distance ASC LIMIT 20',
		{ replacements: [formattedEmbedding] }
	);

	console.log('RESULTS AQUIRED');
	console.log(results);

	console.log('RESULT LENGHT', results.length);

	const parsedData =
		results.map(el => el.chunk as string).join('\n') +
		`The data was taken from ${results[0].name}`;
	// console.log(results);
	// console.log('PARSED DATA', parsedData);

	const contructedPrompt = `
	Answer the question based on provided context.Augment your knowledge.
	Context : ${parsedData}

	Question : ${userQuery}
	
	Finish the answer with the source of data in format: [Source: <source_name>]
	`;

	const response = await generateText({
		model: ollama('qwen2.5:3b'),
		prompt: contructedPrompt,
	});

	console.log('MODEL RESPONSE', response);
	console.log('RAG TEST ENDED...');
}

//get all documents
export async function getAllDocuments() {
	try {
		const documents = await Documents.findAll({
			order: [['createdAt', 'DESC']],
		});
		return documents.map(document => document.toJSON());
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching documents');
	}
}
