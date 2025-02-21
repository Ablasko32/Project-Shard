import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { cosineSimilarity, embed, embedMany } from 'ai';
import { ollama } from '@/lib/ollamaClient';
import { EmbeddingModelV1Embedding } from '@ai-sdk/provider';
import { Embeddings } from '@/db/schema';
import db from '@/db';
import { sql } from 'drizzle-orm';
import { verifySessionOrError } from '@/lib/verifySessionServer';

const CHUNK_SIZE: number = 500;
const CHUNK_OVERLAP: number = 50;

const DEFAULT_EMBEDDING_MODEL = process.env.DEFAULT_EMBEDDING_MODEL;
if (!DEFAULT_EMBEDDING_MODEL) {
	throw new Error('No default model in enviroment!');
}

// clean text for embedding
function cleanText(text: string): string {
	return text
		.replace(/\s+/g, ' ') //replace multiline with single line
		.replace(/\n+/g, '\n') //collapse multiple newlines to a single newline
		.replace(/^\s+|\s+$/g, ''); //trim leading and trailing whitespace
}

// chunk up text for embedding
export async function chunkUpText(text: string): Promise<string[]> {
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: CHUNK_SIZE,
		chunkOverlap: CHUNK_OVERLAP,
		separators: ['\n\n', '\n', ' '],
	});

	return await splitter.splitText(cleanText(text));
}

// ollama embedding generate many embeddings
export async function generateEmbedding(
	chunkedText: string[]
): Promise<EmbeddingModelV1Embedding[]> {
	const { embeddings } = await embedMany({
		model: ollama.embedding(DEFAULT_EMBEDDING_MODEL as string),
		values: chunkedText,
	});
	// console.log(
	// 	`cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`
	// );
	return embeddings;
}

// embedd user querry
export async function generateQueryEmbedding(
	userQuery: string
): Promise<EmbeddingModelV1Embedding> {
	const { embedding } = await embed({
		model: ollama.embedding(DEFAULT_EMBEDDING_MODEL as string),
		value: userQuery,
	});
	// console.log(
	// 	`cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`
	// );
	return embedding;
}

// bulk text insert
export async function bulkInsertEmbeddings(
	chunks: string[],
	embeddings: EmbeddingModelV1Embedding[],
	documentId: number
) {
	if (chunks.length !== embeddings.length)
		throw new Error('Embedding length mismatch');

	try {
		const insertData = chunks.map((chunk, index) => {
			return {
				chunk: chunk,
				embedding: embeddings[index],
				documentId,
			};
		});

		await db.insert(Embeddings).values(insertData);
	} catch (err) {
		console.error(err);
		throw new Error('Error inserting to database');
	}
}

// encode user query and construct prompt with rag context
export async function encodeUserQueryAndDoRag(
	userQuery: string
): Promise<string> {
	// embedd user query
	const queryEmbedding = await generateQueryEmbedding(userQuery);
	const userId = await verifySessionOrError();
	//format as needed
	const formattedEmbedding = `[${queryEmbedding.join(',')}]`;
	// preform similary search, join doucments to know where did data come from
	const { rows } = await db.execute(
		sql`SELECT embeddings.chunk,documents.name ,embedding <#> CAST(${formattedEmbedding} AS vector) AS distance 
		FROM embeddings JOIN documents ON embeddings.document_id=documents.id 
		WHERE embedding <#> CAST(${formattedEmbedding} AS vector) < -0.5  AND documents.user_id=${userId}
		ORDER BY distance ASC  
		LIMIT 12`
	);

	// data sources documents
	const dataSources = [...new Set(rows.map((el: any) => el.name))].join(',');
	// console.log(dataSources);

	// construct context data
	const contextData =
		rows.map((el: any) => el.chunk as string).join('\n') +
		`\nThe data was taken from data sources:${dataSources}`;

	// construct RAG prompt
	const contructedPrompt = `
	Answer the question based on provided context.Augment your knowledge.Finish the answer by providing data sources.
	Context : ${contextData}

	Question : ${userQuery}
	`;

	console.log('CONSTRUCTED PROMPT:', contructedPrompt);

	return contructedPrompt;
}
