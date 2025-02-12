'use client';

import Link from 'next/link';
import MessageDisplay from '@/app/_components/MessageDisplay';
import { GoAlert } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/_lib/store';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Message, useChat } from 'ai/react';
import { TfiReload } from 'react-icons/tfi';
import ChatInput from '@/app/_components/ChatInput';

export default function MainChat({
	id,
	initialMessages,
}: {
	id?: string | undefined;
	initialMessages: Message[];
}) {
	const selectedAIModel: string = useSelector(
		(store: RootState) => store.model.model
	);

	const { username, defaultSystemMessage } = useSelector(
		(store: RootState) => store.settings
	);

	const settingsSystemMessage: string = `My name is ${username ? username : 'user'} and I am here to chat with you, you will speak to me using my name.If my name is user ask me if i want to change my settings and say welcome to Project Shard. ${defaultSystemMessage ? defaultSystemMessage : 'You are a helpful assistant'}`;

	const {
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		messages,
		error,
		stop,
		reload,
		setInput,
	} = useChat({
		id,
		initialMessages,
		sendExtraMessageFields: true,
		body: {
			model: selectedAIModel,
			settingsSystemMessage,
		},
		onError(error) {
			console.error(error);
			toast.error(error.message);
		},
	});

	function handleMessageSubmit(e: FormEvent): void {
		e.preventDefault();
		if (selectedAIModel == 'Select a model') {
			toast.error('Select a model first');
			return;
		}
		handleSubmit();
	}

	return (
		<>
			{' '}
			<Link
				href="/models"
				className="fixed left-1/2 top-4 z-10 -translate-x-1/2 transform rounded-xl border border-lightAccent bg-inherit px-4 py-1 text-center text-sm font-light dark:border-darkAccent lg:left-1/4 lg:top-6"
			>
				{selectedAIModel}
			</Link>
			<div className="mb-12 mt-8 flex h-full max-h-full flex-1 items-start justify-center overflow-y-scroll">
				{/* Display messages or logo */}

				<MessageDisplay messages={messages} />
			</div>
			{/* error */}
			{error && (
				<p className="z-50 flex items-center justify-center gap-1 text-center text-xs text-lightError dark:text-darkError lg:text-sm">
					<GoAlert />
					Chat Error!
					<button className="ml-2 hover:scale-110" onClick={e => reload()}>
						<TfiReload />
					</button>
				</p>
			)}
			<ChatInput
				stop={stop}
				setInput={setInput}
				isLoading={isLoading}
				handleInputChange={handleInputChange}
				handleMessageSubmit={handleMessageSubmit}
				input={input}
			/>
		</>
	);
}
