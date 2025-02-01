import { ollama } from '@/app/services/ollama';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

interface Body {
	model: string;
}

// post messages from the front end
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

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
