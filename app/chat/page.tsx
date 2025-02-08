import { redirect } from 'next/navigation';
import { createChat } from '@/tools/chat-store';

export default async function Page() {
	// create a new chat and redirect to that chat id
	const id = await createChat();
	redirect(`/chat/${id}`);
}
