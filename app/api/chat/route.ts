import { ollama } from '@/app/services/ollama';
import { streamText } from 'ai';
import { NextResponse, type NextRequest } from 'next/server';

// model to be used by ollama
const MODEL_NAME: string = 'qwen2.5-coder:3b';

// post messages from the front end
export async function POST(request: NextRequest) {
	try {
		const { messages } = await request.json();

		const aiResponse = streamText({
			model: ollama(MODEL_NAME),
			messages,
		});

		return aiResponse.toDataStreamResponse();
	} catch (err) {
		console.error('ERR-SERVER:', err);
		return NextResponse.json({
			err: 'Critical Error',
		});
	}
}
