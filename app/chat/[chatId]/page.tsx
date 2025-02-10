import MainChat from '@/app/_components/MainChat';
import { loadChat } from '@/tools/chat-store';

export default async function page({
	params,
}: {
	params: Promise<{ chatId: string }>;
}) {
	const { chatId } = await params;

	const messages = await loadChat(chatId);
	// console.log('MESSAGES RETRVIED', messages);

	return (
		<div className="pageContainer flex min-w-full flex-col">
			<MainChat id={chatId} initialMessages={messages} />
		</div>
	);
}
