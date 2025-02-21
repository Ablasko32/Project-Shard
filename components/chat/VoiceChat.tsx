'use client';

import 'regenerator-runtime/runtime';
import { HiOutlineMicrophone } from 'react-icons/hi';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoEarOutline } from 'react-icons/io5';

interface VoiceChat {
	setInput: (transcript: string) => void;
	setVoiceMode: (prev: boolean) => void;
}

export default function VoiceChat({ setInput, setVoiceMode }: VoiceChat) {
	const { transcript, listening, browserSupportsSpeechRecognition } =
		useSpeechRecognition();

	// auto stop
	function handleMicrophoneStart(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();
		SpeechRecognition.startListening({ language: 'en-US' });
	}

	// when not listening and if there is transcript set input to it and exit voice mode
	useEffect(() => {
		if (!listening && transcript.trim().length > 0) {
			console.log('triggered');
			setInput(transcript);
			setVoiceMode(false);
		}
	}, [listening, transcript, setInput, setVoiceMode]);

	// handle listening on space click
	useEffect(() => {
		function handleSpaceClick(e: KeyboardEvent) {
			if (e.key === ' ') {
				SpeechRecognition.startListening({ language: 'en-US' });
			}
		}
		document.addEventListener('keydown', handleSpaceClick);

		return () => {
			document.removeEventListener('keydown', handleSpaceClick);
		};
	}, []);

	// if browser doesnt support speech recognition throw error
	if (!browserSupportsSpeechRecognition) {
		return (
			<p className="text-center text-sm text-lightError dark:text-darkError">
				Browser doesn&apos;t support speech recognition.
			</p>
		);
	}

	return (
		<div className="flex min-w-full flex-col">
			<div className="mx-auto flex items-center justify-center gap-2">
				<motion.button
					className="flex h-12 w-12 items-center justify-center rounded-full bg-lightPrimary text-2xl text-lightBg dark:bg-darkPrimary dark:text-darkBg"
					onClick={handleMicrophoneStart}
					whileHover={{
						scale: 0.95,
					}}
					whileTap={{ scale: 0.9 }}
					// animate growing on listening
					animate={
						listening
							? {
									scale: [1, 1.1, 1],
									transition: { repeat: Infinity, duration: 1 },
								}
							: { scale: 1 }
					}
				>
					{!listening ? <HiOutlineMicrophone /> : <IoEarOutline />}
				</motion.button>
			</div>
			{/* <p className="mt-2 text-center text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary">
				Works best on Google Chrome Desktop.
			</p> */}
			<p className="mx-auto mt-1 max-h-10 max-w-sm overflow-y-scroll text-center text-xs text-lightTextSecondary dark:text-darkTextSecondary">
				{transcript}
			</p>
		</div>
	);
}
