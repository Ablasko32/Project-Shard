'use server';
import { revalidatePath } from 'next/cache';
import { Prompts as IPrompts } from '@/app/_components/PromptsSearchAndDisplay';
import pdfParse from 'pdf-parse';
import path from 'path';
import fs from 'fs/promises';
import mammoth from 'mammoth';
import {
	bulkInsertEmbeddings,
	chunkUpText,
	generateEmbedding,
	// generateQueryEmbedding,
} from '@/helpers/textProcessing';
// import { generateText } from 'ai';
// import { ollama } from '@/app/_lib/ollamaClient';
import db from '@/db';
import { Documents, Prompts, Settings } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { verifySessionOrError } from '@/helpers/verifySessionServer';

// revalidate a path
export async function revalidatePathAction(path: string) {
	revalidatePath(path);
}

//PROMPTS

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

// Aadd new prompt
export async function addNewPrompt(formData: FormData): Promise<void> {
	const prompt = formData.get('prompt') as string;
	const title = formData.get('title') as string;
	const userId = await verifySessionOrError();

	if (!prompt || !title) throw new Error('Invalid form data');
	try {
		await db.insert(Prompts).values({
			title: title.slice(0, 150),
			content: prompt.slice(0, 1000),
			userId,
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
		await db.delete(Prompts).where(eq(Prompts.id, id));
		revalidatePath('/prompts');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting prompt');
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

// create or update settings
export async function updateSettings(formData: FormData): Promise<void> {
	const username = formData.get('username')?.slice(0, 100) as string;
	const system = formData.get('system')?.slice(0, 1000) as string;

	const userId = await verifySessionOrError();

	try {
		const settings = await db.select().from(Settings);
		if (!settings.length) {
			await db.insert(Settings).values({ username, system, userId });
		} else {
			await db.delete(Settings);
			await db.insert(Settings).values({ username, system, userId });
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
		const [doesDocumentExist] = await db
			.select()
			.from(Documents)
			.where(eq(Documents.name, name));

		if (doesDocumentExist) {
			throw new Error('This document already exists');
		}

		// create it if it doesnt exist
		const userId = await verifySessionOrError();

		const [createdDocument] = await db
			.insert(Documents)
			.values({
				name,
				size,
				extension: fileExtension,
				userId,
			})
			.returning();

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
// export async function ragTest() {
// 	const userQuery = 'How to use tools in vercel ai sdk';
// 	const queryEmbedding = await generateQueryEmbedding(userQuery);
// 	// console.log(queryEmbedding);
// 	console.log('STARTING RAG TEST...');

// 	const formattedEmbedding = `[${queryEmbedding.join(',')}]`;
// 	const [results] = await sequelize.query(
// 		'SELECT embeddings.chunk,documents.name , embedding <#> CAST(? AS vector) AS distance FROM embeddings JOIN documents ON embeddings."documentId"=documents.id  ORDER BY distance ASC LIMIT 20',
// 		{ replacements: [formattedEmbedding] }
// 	);

// 	console.log('RESULTS AQUIRED');
// 	console.log(results);

// 	console.log('RESULT LENGHT', results.length);

// 	const parsedData =
// 		results.map(el => el.chunk as string).join('\n') +
// 		`The data was taken from ${results[0].name}`;
// 	// console.log(results);
// 	// console.log('PARSED DATA', parsedData);

// 	const contructedPrompt = `
// 	Answer the question based on provided context.Augment your knowledge.
// 	Context : ${parsedData}

// 	Question : ${userQuery}

// 	Finish the answer with the source of data in format: [Source: <source_name>]
// 	`;

// 	const response = await generateText({
// 		model: ollama('qwen2.5:3b'),
// 		prompt: contructedPrompt,
// 	});

// 	console.log('MODEL RESPONSE', response);
// 	console.log('RAG TEST ENDED...');
// }

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

// delete document
export async function deleteDocument(id: number) {
	try {
		await db.delete(Documents).where(eq(Documents.id, id));
		revalidatePath('/documents');
		return;
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting document');
	}
}
