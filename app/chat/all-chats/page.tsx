import { getAllChats } from '@/tools/chat-store';

export default async function page() {
	const chats = await getAllChats();
	console.log(chats);

	return (
		<div className="pageContainer">
			<h1>ALL CHATS</h1>
			<ul className="flex flex-col gap-4">
				{chats.map((chat, idx) => {
					return (
						<li key={idx}>
							{idx + 1}.CHAT----CHAT ID:{chat[0].chatId},<br></br> first user
							message: {chat[1].content} ...
						</li>
					);
				})}
			</ul>
		</div>
	);
}
