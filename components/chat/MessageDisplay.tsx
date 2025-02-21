import React, { useEffect, useRef } from 'react';
import 'highlight.js/styles/stackoverflow-light.css';
import { Message } from '@/types/types';
import ChatMessage from '@/components/chat/ChatMessage';

function MessageDisplay({ messages }: { messages: Message[] }) {
	const endOfMessageRef = useRef<HTMLDivElement | null>(null);

	// scroll to bottom of messages
	useEffect(() => {
		if (!endOfMessageRef.current) return;
		endOfMessageRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}, [messages]);

	return (
		<div
			className={`mt-auto flex max-h-72 w-full max-w-7xl flex-col gap-2 p-2 ${
				messages.length === 0 ? 'mb-24' : ''
			}`}
		>
			{messages.length > 0 ? (
				messages.map((msg, idx) => <ChatMessage msg={msg} key={idx} />)
			) : (
				<div className="flex flex-col items-center gap-2 text-center">
					<h2 className="text-2xl font-bold lg:text-3xl">
						Welcome to{' '}
						<span className="text-lightPrimary dark:text-darkPrimary">
							Shard
						</span>
					</h2>
					<p className="text-md text-lightTextSecondary dark:text-darkTextSecondary lg:text-xl">
						Ask.
					</p>
				</div>
			)}
			{/* end of messages ref for auto scroll */}
			<div ref={endOfMessageRef}></div>
		</div>
	);
}

export default MessageDisplay;
