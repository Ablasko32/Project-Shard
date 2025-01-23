'use client';

import { useChat } from 'ai/react';
import MessageDisplay from './_components/MessageDisplay';
import { AiOutlineSend } from 'react-icons/ai';
import { PiStopCircle } from 'react-icons/pi';
import Link from 'next/link';
import ChatLoader from './_components/ChatLoader';

export default function Home() {
	const {
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		messages,
		error,
		stop,
	} = useChat();

	console.log(error);
	if (error) return <p>Error</p>;

	return (
		<div className="pageContainer flex min-w-full flex-col">
			<Link
				href="/models"
				className="border-lightAccent dark:border-darkAccent fixed left-1/2 top-4 z-10 -translate-x-1/2 transform rounded-xl border bg-inherit px-4 py-1 text-center text-sm font-light lg:left-1/4 lg:top-6"
			>
				qwen2.5-coder:3b
			</Link>
			<div className="mt-8 flex h-full max-h-full flex-1 items-start justify-center overflow-y-scroll">
				{/* Display messages or logo */}
				<MessageDisplay messages={messages} />
			</div>

			<div className="relative flex items-end justify-center py-4">
				<ChatLoader isVisible={isLoading} />
				<form
					className="text-lightText dark:text-darkText flex w-full max-w-3xl gap-4"
					onSubmit={handleSubmit}
				>
					<textarea
						className="messageInput resize-none"
						disabled={isLoading}
						value={input}
						onChange={handleInputChange}
						placeholder="Ask me anything!"
					/>
					<button className="text-lightAccent dark:text-darkAccent cursor-pointer text-3xl hover:scale-110 lg:text-4xl">
						{isLoading ? (
							<span onClick={stop}>
								<PiStopCircle />
							</span>
						) : (
							<AiOutlineSend />
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
