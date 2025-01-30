'use client';

import toast from 'react-hot-toast';
import Button from '@/app/_components/Button';
import { AiOutlineWifi } from 'react-icons/ai';

export default function ConnectionTest() {
	// test a connection to ollama api by sending a request to the server / and display a toast
	async function handleConnectionTest(): Promise<void> {
		try {
			const response = await fetch('/api/proxy/');
			if (!response.ok) {
				throw new Error('Connection failed');
			}
			toast.success('Connected');
		} catch (err) {
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
			<h3 className="text-xl lg:text-2xl lg:font-bold">
				Default Ollama API host:
			</h3>
			<p className="mb-2 text-lightTextSecondary dark:text-darkTextSecondary lg:text-xl">
				https://localhost:11434
			</p>
			<Button onClick={handleConnectionTest} className="">
				<AiOutlineWifi />
				Test
			</Button>
		</div>
	);
}
