'use client';
import { HiOutlineTrash } from 'react-icons/hi';
import Button from './Button';
import { LuPlay } from 'react-icons/lu';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { deleteChat } from '@/tools/chat-store';

export default function IndividualChat({ chat }: { chat: any[] }) {
	async function handleDeleteChat(): Promise<void> {
		const chatId = chat[0].chatId;

		if (!window.confirm('Are you sure?')) return;
		try {
			await deleteChat(chatId);
			toast.success('Chat deleted');
		} catch (err) {
			console.error(err);
			toast.error('Error deleting chat');
		}
	}

	return (
		<li
			className="mx-auto mt-4 grid w-full max-w-6xl grid-cols-[1fr,10%] grid-rows-[1fr,10%] items-center pr-2"
			key={chat[0].chatId}
		>
			{/* chat contanet first message is title and second is content */}
			<div className="flex flex-col gap-2">
				<h2 className="font-semibold">{chat[1].content.slice(0, 50)}...</h2>

				<p className="w-[70%] text-lightTextSecondary dark:text-darkTextSecondary">
					{chat[2]?.content.slice(0, 100)} ...
				</p>
			</div>

			{/* navigation to chat with chatId */}
			<Link href={`/chat/${chat[0].chatId}`}>
				<motion.button
					whileHover={{
						scale: 0.95,
						transition: { duration: 0.1 },
					}}
					whileTap={{ scale: 0.9 }}
					className="rounded-full bg-lightPrimary p-2 text-lightBg transition-all duration-150 dark:bg-darkPrimary dark:text-darkBg"
				>
					<LuPlay className="stroke-[2px]" />
				</motion.button>
			</Link>
			{/* date of conversation */}
			<div className="flex items-center gap-2 place-self-end">
				{/* delete chat button */}
				<Button
					onClick={handleDeleteChat}
					type="secondary"
					className="text-sm text-lightError dark:text-darkError"
				>
					<HiOutlineTrash />
				</Button>
				<p className="text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary">
					{chat[0].chatDate}
				</p>
			</div>
		</li>
	);
}
