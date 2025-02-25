import { ollama } from '@/lib/ollamaClient';
import { streamText, appendResponseMessages } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { saveChat } from '@/lib/chat-store';
import { encodeUserQueryAndDoRag } from '@/lib/textProcessing';
import { Body } from '@/types/types';
import { createOpenRouterClient, getApiKey } from '@/lib/openRouterClient';
import { verifySessionOrError } from '@/lib/verifySessionServer';

// post messages from the front end
export async function POST(request: NextRequest) {
	// fetching api key based on user
	const userId = await verifySessionOrError();
	const apiKey = await getApiKey(userId);

	const openRouter = createOpenRouterClient(apiKey);

	try {
		const body: Body = await request.json();

		console.log('BODY', body);

		// PICK PROVIDER HERE
		function pickProvider() {
			switch (body.provider) {
				case 'ollama': {
					return ollama(body.model);
				}
				case 'openRouter': {
					return openRouter.languageModel(body.model);
				}
				default: {
					return ollama(body.model);
				}
			}
		}

		if (body.model === 'Select a model')
			return NextResponse.json({ error: 'Error' });

		// body messages
		const bodyMessages = body.messages;

		let ragPrompt: string;
		// RAG MODE
		if (body.ragMode) {
			console.log('RAG MODE');
			const lastMsg = body.messages[body.messages.length - 1].content;
			// console.log('LST MSG', lastMsg);
			const constructedRagPrompt = await encodeUserQueryAndDoRag(
				lastMsg as string
			);
			ragPrompt = constructedRagPrompt;
		}

		// prompt or message array?
		const prompt = body.ragMode
			? { prompt: ragPrompt! }
			: { messages: bodyMessages, system: body.settingsSystemMessage };

		const aiResponse = streamText({
			model: pickProvider(),
			...prompt,
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
