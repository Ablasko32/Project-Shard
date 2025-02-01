import { ollama } from '@/app/services/ollamaClient';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

interface Body {
	model: string;
	messages: [];
	settingsSystemMessage: string;
}

// post messages from the front end
export async function POST(request: NextRequest) {
	try {
		const body: Body = await request.json();

		console.log('BODY', body);
		if (body.model === 'Select a model')
			return NextResponse.json({ error: 'Error' });

		const aiResponse = streamText({
			model: ollama(body.model),
			messages: body.messages,
			system: body.settingsSystemMessage,
		});

		return aiResponse.toDataStreamResponse();
	} catch (err) {
		console.error('ERR-SERVER:', err);
		return NextResponse.json({
			err: 'Critical Error',
		});
	}
}
