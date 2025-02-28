'use client';

import ChatLoader from '@/components/chat/ChatLoader';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { HiOutlineMicrophone } from 'react-icons/hi';
import { PiStopCircle } from 'react-icons/pi';
import Button from '@/components/ui/Button';
import { RxKeyboard } from 'react-icons/rx';
import VoiceChat from '@/components/chat/VoiceChat';
import { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoAdd } from 'react-icons/io5';

import RagButton from './RagButton';

interface ChatInput {
	setInput: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
	handleMessageSubmit: (e: FormEvent<Element>) => void;
	handleInputChange: (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => void;
	input: string;
	stop: () => void;
}

export default function ChatInput({
	isLoading,
	handleMessageSubmit,
	input,
	handleInputChange,
	setInput,
	stop,
}: ChatInput) {
	const [voiceMode, setVoiceMode] = useState<boolean>(false);

	return (
		<div className="relative flex items-end justify-center py-4">
			<ChatLoader isVisible={isLoading} />

			<form
				className="flex w-full max-w-3xl gap-2 text-lightText dark:text-darkText"
				onSubmit={handleMessageSubmit}
			>
				{/* ACTIONS CONTAINER */}
				<div className="absolute -top-4 left-auto flex items-center gap-2 text-xs">
					<Link href="/chat">
						<Button type="secondary">
							{' '}
							<IoAdd />
							New
						</Button>
					</Link>
					<Button
						onClick={e => {
							e.preventDefault();
							setVoiceMode(prev => !prev);
						}}
						type="secondary"
					>
						{' '}
						{!voiceMode ? <HiOutlineMicrophone /> : <RxKeyboard />}
						{!voiceMode ? 'Voice' : 'Chat'}
					</Button>
					<RagButton />
				</div>
				{!voiceMode && (
					<>
						<textarea
							onKeyDown={e => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault(); // Prevent new line
									handleMessageSubmit(e); // Call your send function
								}
							}}
							className="messageInput resize-none lg:h-20"
							disabled={isLoading}
							rows={1}
							value={input}
							onChange={handleInputChange}
							placeholder="Ask me anything!"
						/>

						<motion.button
							whileHover={{ scale: 0.95 }}
							whileTap={{ scale: 0.9 }}
							className="cursor-pointer text-2xl text-lightAccent dark:text-darkAccent lg:text-4xl"
						>
							{isLoading ? (
								<span onClick={stop}>
									<PiStopCircle />
								</span>
							) : (
								<AiOutlineSend />
							)}
						</motion.button>
					</>
				)}
				{voiceMode && (
					<VoiceChat setInput={setInput} setVoiceMode={setVoiceMode} />
				)}
			</form>
		</div>
	);
}
