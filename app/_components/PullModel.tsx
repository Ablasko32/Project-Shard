'use client';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { useState } from 'react';
import ModelPullDescription from './ModelPullDescription';
import TinySpinner from './TinySpinner';
import { motion } from 'framer-motion';
import { FaStopCircle } from 'react-icons/fa';

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

	// async function handleModelPull(e: FormEvent) {
	// 	e.preventDefault();
	// 	if (!modelName || !modelName.length) return;
	// 	setLoading(true);
	// 	try {
	// 		await pullModel(modelName);
	// 	} catch (err) {
	// 		console.log(err);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }

	async function handleModelPullAxios(e) {
		console.log('CLICK');
		e.preventDefault();
		if (!modelName || !modelName.length) return;

		setLoading(true);
		const abortController = new AbortController();
		setAbortController(abortController);

		try {
			const response = await fetch('http://localhost:11434/api/pull', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-ndjson' },
				body: JSON.stringify({
					model: modelName,
				}),
				signal: abortController.signal,
			});

			if (!response.body) {
				throw new Error('ReadableStream not supported in this browser.');
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });

				const lines = buffer.split('\n');
				buffer = lines.pop() || '';

				for (const line of lines) {
					if (line.trim() === '') continue;
					try {
						const chunk = JSON.parse(line);
						console.log(chunk);
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
						window.alert(err);
					}
				}
			}

			if (buffer.trim() !== '') {
				try {
					const chunk = JSON.parse(buffer);
					console.log(chunk);
					// Process the final chunk as needed
				} catch (err) {
					console.error('Error parsing final chunk:', err);
				}
			}
		} catch (error) {
			console.error('Error pulling model:', error);
		} finally {
			setLoading(false);
			setAbortController(null);
		}
	}

	function abortPull() {
		abortController?.abort();
		window.alert('ABORTED');
	}

	const progressValue = (progress.completed / progress.total) * 100;

	return (
		<div className="flex flex-col items-center gap-6">
			<form
				onSubmit={handleModelPullAxios}
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
					<motion.button
						whileHover={{
							scale: 0.95,
						}}
						whileTap={{
							scale: 0.85,
						}}
						transition={{ duration: 0.2 }}
						disabled={isLoading}
						type="submit"
						className="flex w-1/3 items-center justify-center gap-1 self-center rounded-lg bg-lightPrimary py-1 font-semibold uppercase text-lightBg dark:bg-darkPrimary dark:text-darkBg lg:w-1/5"
					>
						<IoCloudDownloadOutline />
						{isLoading ? 'Pulling' : 'Pull'}
					</motion.button>
					{isLoading && (
						<motion.button
							onClick={abortPull}
							whileHover={{
								scale: 0.95,
							}}
							whileTap={{
								scale: 0.85,
							}}
							transition={{ duration: 0.2 }}
							className="flex w-1/3 items-center justify-center gap-1 self-center rounded-lg bg-lightError py-1 font-semibold uppercase text-lightBg dark:bg-darkError dark:text-darkBg lg:w-1/5"
						>
							<FaStopCircle />
							Abort
						</motion.button>
					)}
				</div>

				{/* abort button */}
			</form>
			<ModelPullDescription />
		</div>
	);
}
