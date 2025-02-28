'use client';

import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { AiOutlineWifi } from 'react-icons/ai';
import { useState } from 'react';
import { useAIProvider } from '@/contexts/AiProviderProvider';

// preforms connection test based on AI provider selected simple get request to see response
export default function ConnectionTest() {
	const [isConnected, setConnected] = useState<boolean | null>(null);

	const { provider } = useAIProvider();

	const testURL: string =
		provider === 'ollama'
			? '/api/proxy/'
			: 'https://openrouter.ai/api/v1/models';

	// test a connection to ollama api by sending a request to the server / and display a toast
	async function handleConnectionTest(): Promise<void> {
		setConnected(null);
		try {
			const response = await fetch(testURL);
			if (!response.ok) {
				throw new Error('Connection failed');
			}
			setConnected(true);
			toast.success('Connected');
		} catch (err) {
			setConnected(false);
			if (err instanceof Error) {
				console.error(err);
				toast.error(err.message);
			} else {
				console.log(err);
				toast.error('An error occured');
			}
		}
	}

	return (
		<div className="flex flex-col items-center gap-1">
			<div className="mb-2 flex items-center gap-1 text-lightTextSecondary dark:text-darkTextSecondary lg:text-xl">
				{provider === 'ollama' && (
					<p>{process.env.OLLAMA_API ?? 'http://localhost:11434'}</p>
				)}
				{provider === 'openRouter' && (
					<p>https://openrouter.ai/api/v1/models</p>
				)}

				{isConnected && (
					<span className="h-2 w-2 rounded-full bg-lightPrimary dark:bg-darkPrimary"></span>
				)}
				{isConnected === false && (
					<span className="h-2 w-2 rounded-full bg-lightError dark:bg-darkError"></span>
				)}
			</div>

			<Button onClick={handleConnectionTest} className="">
				<AiOutlineWifi />
				Test
			</Button>
		</div>
	);
}
