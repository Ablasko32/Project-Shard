import MainChat from '@/components/chat/MainChat';
import RagProvider from '@/contexts/RagProvider';

import { getAllSettings } from '@/lib/dbOperations';
import { loadChat } from '@/lib/chat-store';
import { Message } from 'ai';

export default async function page({
	params,
}: {
	params: Promise<{ chatId: string }>;
}) {
	const { chatId } = await params;

	const messages: Message[] = await loadChat(chatId);
	const settings = await getAllSettings();
	// console.log('MESSAGES RETRVIED', messages);

	return (
		<div className="pageContainer flex min-w-full flex-col">
			<RagProvider>
				<MainChat id={chatId} initialMessages={messages} settings={settings} />
			</RagProvider>
		</div>
	);
}
