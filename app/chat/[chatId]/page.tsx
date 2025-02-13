import MainChat from '@/app/_components/MainChat';
import { Settings } from '@/app/_components/SettingsForm';
import { getAllSettings } from '@/app/_lib/actions';
import { loadChat } from '@/tools/chat-store';

export default async function page({
	params,
}: {
	params: Promise<{ chatId: string }>;
}) {
	const { chatId } = await params;

	const messages = await loadChat(chatId);
	const settings: Settings = await getAllSettings();
	// console.log('MESSAGES RETRVIED', messages);

	return (
		<div className="pageContainer flex min-w-full flex-col">
			<MainChat id={chatId} initialMessages={messages} settings={settings} />
		</div>
	);
}
