'use client';
import { LuPlay } from 'react-icons/lu';
import { easeInOut, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useModelProvider } from '@/contexts/ModelProvider';
import { PiMoneyWavy } from 'react-icons/pi';
import { OpenRouterModel } from '@/types/types';
import Button from '@/components/ui/Button';

export default function IndividualOpenRouterModel({
	model,
	handleOpen,
	index,
	openIndex,
}: {
	model: OpenRouterModel;
	handleOpen: (index: number) => void;
	index: number;
	openIndex: number | null;
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
			className="mx-auto mb-2 flex w-full max-w-6xl flex-col items-center justify-between"
		>
			{/* title and date */}
			<div className="mb-2 flex w-full items-center justify-between">
				<h3 className="font-semibold">{model.name}</h3>
				<p className="text-sm font-light text-lightTextSecondary dark:text-darkTextSecondary">
					{new Date(model.created * 1000).toLocaleDateString()}
				</p>
			</div>
			{/*  */}
			<div className="flex w-full items-center justify-between">
				<div className="mb-2 flex items-center gap-4">
					<p className="text-sm">
						Context:{' '}
						<span className="text-lightTextSecondary dark:text-darkTextSecondary">
							{model['context_length']}
						</span>
					</p>
					{Number(model.pricing.prompt) === 0 && (
						<p className="rounded-md bg-lightPrimary px-1 py-1 text-xs font-semibold text-lightBg dark:bg-darkPrimary dark:text-darkBg">
							# FREE
						</p>
					)}
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
			<div className="self-start">
				{' '}
				<Button
					type="secondary"
					onClick={() => handleOpen(index)}
					className="text-sm"
				>
					<PiMoneyWavy />
					Pricing
				</Button>
				{openIndex === index && (
					<motion.ul
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						transition={{ duration: 0.2, ease: easeInOut }}
						className="self-start text-left text-lightTextSecondary dark:text-darkTextSecondary"
					>
						<li>Completion: {model.pricing.completion}$</li>
						<li>Prompts: {model.pricing.prompt}$</li>
						<li>Image: {model.pricing.image}$</li>
						<li>Request: {model.pricing.request}$</li>
					</motion.ul>
				)}
			</div>
		</li>
	);
}
