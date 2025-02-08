import { ollama } from '@/app/_lib/ollamaClient';
import { streamText, appendResponseMessages } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { saveChat } from '@/tools/chat-store';

interface Body {
	model: string;
	messages: [];
	settingsSystemMessage: string;
	id: string;
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
			async onFinish({ response }) {
				await saveChat({
					id: body.id,
					messages: appendResponseMessages({
						messages: body.messages,
						responseMessages: response.messages,
					}),
				});
			},
		});

		return aiResponse.toDataStreamResponse();
	} catch (err) {
		console.error('ERR-SERVER:', err);
		return NextResponse.json({
			err: 'Critical Error',
		});
	}
}
