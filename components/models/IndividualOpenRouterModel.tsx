'use client';
import { LuPlay } from 'react-icons/lu';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useModelProvider } from '@/contexts/ModelProvider';
import { PiMoneyWavy } from 'react-icons/pi';
import { OpenRouterModel } from '@/types/types';

export default function IndividualOpenRouterModel({
	model,
}: {
	model: OpenRouterModel;
}) {
	const router = useRouter();
	const { setModel } = useModelProvider();

	// selects model as current model in redux store
	function handleSelectModel(modelId: string): void {
		// switch model via modelProvider
		try {
			setModel(modelId);
			toast.success('Model switched');
			// navigate back to chat
			router.push('/chat');
		} catch (err) {
			console.error(err);
			toast.error('Error switching model');
		}
	}

	return (
		<li
			key={model.id}
			className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between"
		>
			{/* title and date */}
			<div className="mb-2 flex w-full items-center justify-between">
				<h3 className="font-semibold">{model.name}</h3>
				<p className="text-sm font-light text-lightTextSecondary dark:text-darkTextSecondary">
					{new Date(model.created).toLocaleDateString()}
				</p>
			</div>
			{/*  */}
			<div className="flex w-full items-center justify-between">
				<div>
					<p className="mb-2 text-sm">
						Context size: {model['context_length']}
					</p>
					<p className="flex items-center gap-2 text-sm font-semibold">
						<PiMoneyWavy />
						Pricing
					</p>
					<ul className="text-lightTextSecondary dark:text-darkTextSecondary">
						<li>Completion: {model.pricing.completion}$</li>
						<li>Prompts: {model.pricing.prompt}$</li>
						<li>Image: {model.pricing.image}$</li>
						<li>Request: {model.pricing.request}$</li>
					</ul>
				</div>

				<motion.button
					onClick={() => handleSelectModel(model.id)}
					whileHover={{
						scale: 0.95,
						transition: { duration: 0.1 },
					}}
					whileTap={{ scale: 0.9 }}
					className="rounded-full bg-lightPrimary p-2 text-lightBg transition-all duration-150 dark:bg-darkPrimary dark:text-darkBg"
				>
					<LuPlay className="stroke-[2px]" />
				</motion.button>
			</div>
		</li>
	);
}
