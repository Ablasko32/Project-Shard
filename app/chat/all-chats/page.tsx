import Button from '@/app/_components/Button';
import IndividualChat from '@/app/_components/IndividualChat';
import { getAllChats } from '@/tools/chat-store';
import Link from 'next/link';
import { HiOutlineTrash } from 'react-icons/hi';

export default async function page() {
	const chats: any[] | [] = (await getAllChats()) || [];

	return (
		<div className="pageContainer">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold capitalize lg:text-3xl">My Chats</h2>
				{/* clear all chats button */}
				<Button className="lg:mr-20">
					{' '}
					<HiOutlineTrash />
					Clear
				</Button>
			</div>

			<p className="my-10 text-center text-sm text-lightTextSecondary dark:text-darkTextSecondary">
				Here you can browse all your previous chats.
			</p>

			{chats.length ? (
				<ul className="mx-auto mt-10 flex h-full max-w-6xl flex-col gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 dark:divide-darkSecondary">
					{chats.map(chat => {
						return <IndividualChat key={chat[0].chatId} chat={chat} />;
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
