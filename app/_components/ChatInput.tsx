'use client';

import ChatLoader from '@/app/_components/ChatLoader';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { HiOutlineMicrophone } from 'react-icons/hi';
import { PiStopCircle } from 'react-icons/pi';
import Button from '@/app/_components/Button';
import { RxKeyboard } from 'react-icons/rx';
import VoiceChat from '@/app/_components/VoiceChat';
import { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';

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
				<Button
					onClick={e => {
						e.preventDefault();
						setVoiceMode(prev => !prev);
					}}
					type="secondary"
					className="absolute -top-4 left-auto text-xs"
				>
					{' '}
					{!voiceMode ? <HiOutlineMicrophone /> : <RxKeyboard />}
					{!voiceMode ? 'Voice' : 'Chat'}
				</Button>
				{!voiceMode && (
					<>
						<textarea
							className="messageInput resize-none"
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
