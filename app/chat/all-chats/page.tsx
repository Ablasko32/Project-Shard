import DeleteAllChatsButton from '@/components/chat/DeleteAllChatsButton';
import IndividualChat from '@/components/chat/IndividualChat';
import { getAllChats } from '@/lib/chat-store';
import { Metadata } from 'next';
import Link from 'next/link';
import { Chat } from '@/components/chat/IndividualChat';

export const metadata: Metadata = {
	title: 'My chats',
};

export default async function page() {
	const chats: Chat[] | [] = (await getAllChats()) || [];

	return (
		<div className="pageContainer flex flex-col">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold capitalize lg:text-3xl">My Chats</h2>
				{/* clear all chats button */}
				<DeleteAllChatsButton />
			</div>

			{/* <p className="my-6 text-center text-sm text-lightTextSecondary dark:text-darkTextSecondary lg:my-10">
				Here you can browse all your previous chats.
			</p> */}

			{chats.length ? (
				<ul className="mx-auto flex h-24 min-w-full max-w-6xl flex-grow flex-col gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 overflow-y-scroll dark:divide-darkSecondary">
					{chats.map(chat => {
						return <IndividualChat key={chat.id} chat={chat} />;
					})}
				</ul>
			) : (
				// If no chats fallback
				<div className="flex flex-col items-center justify-center gap-2">
					<p>Nothing here yet!</p>
					<p className="rounded-md bg-lightSecondary px-2 py-1 text-center text-sm text-lightTextSecondary dark:bg-darkSecondary dark:text-darkTextSecondary">
						Start by creating your first{' '}
						<Link
							href="/chat"
							className="text-lightPrimary transition-all duration-150 hover:opacity-80 dark:text-darkPrimary"
						>
							/Chat
						</Link>
					</p>
				</div>
			)}
		</div>
	);
}
