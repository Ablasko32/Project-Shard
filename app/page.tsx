'use client';
import { useChat } from 'ai/react';
import MessageDisplay from './_components/MessageDisplay';
import { AiOutlineSend } from 'react-icons/ai';
import { PiStopCircle } from 'react-icons/pi';
import Link from 'next/link';
import ChatLoader from './_components/ChatLoader';
import { useSelector } from 'react-redux';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { GoAlert } from 'react-icons/go';

export default function Home() {
	const selectedAIModel: string = useSelector(store => store.model.model);
	const {
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		messages,
		error,
		stop,
	} = useChat({
		body: {
			model: selectedAIModel,
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

	// console.log(error);
	// if (error) return <p>Error</p>;

	return (
		<div className="pageContainer flex min-w-full flex-col">
			<Link
				href="/models"
				className="fixed left-1/2 top-4 z-10 -translate-x-1/2 transform rounded-xl border border-lightAccent bg-inherit px-4 py-1 text-center text-sm font-light dark:border-darkAccent lg:left-1/4 lg:top-6"
			>
				{selectedAIModel}
			</Link>
			<div className="mt-8 flex h-full max-h-full flex-1 items-start justify-center overflow-y-scroll">
				{/* Display messages or logo */}

				<MessageDisplay messages={messages} />
			</div>

			{/* error */}
			{error && (
				<p className="mb-2 flex items-center justify-center gap-1 text-center text-xs text-lightError dark:text-darkError lg:text-sm">
					<GoAlert />
					Chat Error!
				</p>
			)}

			<div className="relative flex items-end justify-center py-4">
				<ChatLoader isVisible={isLoading} />
				<form
					className="flex w-full max-w-3xl gap-4 text-lightText dark:text-darkText"
					onSubmit={handleMessageSubmit}
				>
					<textarea
						className="messageInput resize-none"
						disabled={isLoading}
						value={input}
						onChange={handleInputChange}
						placeholder="Ask me anything!"
					/>
					<button className="cursor-pointer text-3xl text-lightAccent hover:scale-110 dark:text-darkAccent lg:text-4xl">
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
