import { ollama } from '@/app/_lib/ollamaClient';
import { streamText, appendResponseMessages } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { saveChat } from '@/tools/chat-store';
import { encodeUserQueryAndDoRag } from '@/app/_lib/actions';

interface Body {
	model: string;
	messages: [];
	settingsSystemMessage: string;
	id: string;
	ragMode: boolean;
}

// post messages from the front end
export async function POST(request: NextRequest) {
	try {
		const body: Body = await request.json();

		console.log('BODY', body);
		if (body.model === 'Select a model')
			return NextResponse.json({ error: 'Error' });

		// body messages
		const bodyMessages = body.messages;

		let ragPrompt: string;
		// RAG MODE
		if (body.ragMode) {
			console.log('RAG MODE');
			const lastMsg = body.messages[body.messages.length - 1].content;
			console.log('LST MSG', lastMsg);
			const constructedRagPrompt = await encodeUserQueryAndDoRag(
				lastMsg as string
			);
			ragPrompt = constructedRagPrompt;
		}

		// prompt or message array?
		const prompt = body.ragMode
			? { prompt: ragPrompt }
			: { messages: bodyMessages };

		const aiResponse = streamText({
			model: ollama(body.model),
			...prompt,
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
