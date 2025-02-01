'use client';

import toast from 'react-hot-toast';
import Button from '@/app/_components/Button';
import { AiOutlineWifi } from 'react-icons/ai';
import { useState } from 'react';

export default function ConnectionTest() {
	const [isConnected, setConnected] = useState<boolean | null>(null);

	// test a connection to ollama api by sending a request to the server / and display a toast
	async function handleConnectionTest(): Promise<void> {
		setConnected(null);
		try {
			const response = await fetch('/api/proxy/');
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
				<p>https://localhost:11434</p>
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
