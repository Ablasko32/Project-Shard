'use client';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { FormEvent, useState } from 'react';
import ModelPullDescription from './ModelPullDescription';
import { pullModel } from '../actions';
import TinySpinner from './TinySpinner';
import { motion } from 'framer-motion';

export default function PullModel() {
	const [modelName, setModelName] = useState<string | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	async function handleModelPull(e: FormEvent) {
		e.preventDefault();
		if (!modelName || !modelName.length) return;
		setLoading(true);
		try {
			await pullModel(modelName);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

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
					{isLoading && <TinySpinner />}
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
				</div>

				{/* abort button */}
			</form>
			<ModelPullDescription />
		</div>
	);
}
