'use client';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { useState } from 'react';
import ModelPullDescription from '@/components/models/ModelPullDescription';
import TinySpinner from '@/components/ui/TinySpinner';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { FiStopCircle } from 'react-icons/fi';

interface Progress {
	total: number;
	completed: number;
}

export default function PullModel() {
	const [modelName, setModelName] = useState<string | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<Progress>({
		total: 1,
		completed: 1,
	});
	const [abortController, setAbortController] =
		useState<AbortController | null>(null);

	// Pull models from ollama
	async function handleModelPull(e) {
		e.preventDefault();
		if (!modelName || !modelName.length) return;

		// initializing abort controller for stoppimg the stream
		setLoading(true);
		const abortController = new AbortController();
		setAbortController(abortController);

		// try to fetch the stream
		try {
			const response = await fetch('/api/proxy/api/pull', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-ndjson' },
				body: JSON.stringify({
					model: modelName.trim(),
				}),
				signal: abortController.signal,
			});

			if (!response.body) {
				throw new Error('ReadableStream not supported in this browser.');
			}

			// initialize body reader and decoder
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			// start looping over the values if done break
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				// for every value ,decode it and add to buffer
				buffer += decoder.decode(value, { stream: true });

				// clear buffer of new lines
				const lines = buffer.split('\n');
				buffer = lines.pop() || '';

				// for every line of data recived
				for (const line of lines) {
					if (line.trim() === '') continue;
					try {
						// parse that line as json and generate chunk of data
						const chunk = JSON.parse(line);
						// console.log(chunk);
						// set progress to keep track of amount left
						setProgress(prev => {
							if (!chunk.total || !chunk.completed) return prev;
							if (chunk.completed === chunk.total) return prev;
							return {
								...prev,
								total: chunk.total,
								completed: chunk.completed,
							};
						});
						if (chunk.error) {
							throw new Error(chunk.error);
						}
						// Process each chunk as needed
					} catch (err) {
						console.error('Error parsing chunk:', err);
					}
				}
			}

			//last buffer chunk if needed
			// if (buffer.trim() !== '') {
			// 	try {
			// 		const chunk = JSON.parse(buffer);
			// 		toast.success('Model pulled successfully');
			// 		// console.log(chunk);
			// 		// Process the final chunk as needed
			// 	} catch (err) {
			// 		console.error('Error parsing final chunk:', err);
			// 	}
			// }
		} catch (error) {
			//if abort ignore error
			if (error instanceof Error && error.name === 'AbortError') return;
			toast.error('Error pulling model');
			console.error('Error pulling model:', error);
		} finally {
			setLoading(false);
			setAbortController(null);
		}
	}

	// aborts model pull
	function abortPull() {
		abortController?.abort();
		toast.success('Pull aborted');
	}

	const progressValue = (progress.completed / progress.total) * 100;

	return (
		<div className="flex flex-col items-center gap-6">
			<form
				onSubmit={handleModelPull}
				className="flex w-full flex-col gap-4 lg:w-[50%]"
			>
				<input
					onChange={e => setModelName(e.target.value)}
					placeholder="Model name"
					className="text-darkTextPrimary mx-4 rounded-lg bg-lightSecondary px-4 py-3 focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent"
					type="text"
				/>

				<div className="flex flex-col items-center justify-center gap-1">
					{isLoading && (
						<div className="flex items-center gap-1">
							<TinySpinner />
							<p>{progressValue.toFixed(2)}%</p>
						</div>
					)}
					<Button type="primary" className="w-1/3 self-center lg:w-1/5">
						<IoCloudDownloadOutline />
						{isLoading ? 'Pulling' : 'Pull'}
					</Button>
					{/* abort button */}
					{isLoading && (
						<Button
							type="danger"
							onClick={abortPull}
							className="w-1/3 self-center lg:w-1/5"
						>
							<FiStopCircle />
							Abort
						</Button>
					)}
				</div>
			</form>
			<ModelPullDescription />
		</div>
	);
}
