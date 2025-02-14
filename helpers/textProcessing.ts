import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { cosineSimilarity, embedMany } from 'ai';
import { ollama } from '@/app/_lib/ollamaClient';
import { EmbeddingModelV1Embedding } from '@ai-sdk/provider';

const CHUNK_SIZE: number = 500;
const CHUNK_OVERLAP: number = 50;

const DEFAULT_EMBEDDING_MODEL = process.env.DEFAULT_EMBEDDING_MODEL;
if (!DEFAULT_EMBEDDING_MODEL) {
	throw new Error('No default model in enviroment!');
}

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

// ollama embedding generate embeddings
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
