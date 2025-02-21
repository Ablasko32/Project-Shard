'use client';
import { Model } from '@/types/types';
import { LuPlay } from 'react-icons/lu';
import { useState } from 'react';
import { easeInOut, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowRight, FaRegTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { deleteOllamaModel } from '@/lib/ollamaApi';
import { useModelProvider } from '@/contexts/ModelProvider';

function ModelDisplay({ modelsList }: { modelsList: Model[] }) {
	// console.log(modelsList);

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const { setModel } = useModelProvider();

	const router = useRouter();

	// deletes model and revallidates path
	async function handleDeleteModel(modelName: string): Promise<void> {
		// asks user for confirmation then deletes model based on model name and throws a toast
		if (!window.confirm('Do you want to delete model?')) return;

		await deleteOllamaModel(modelName);
	}

	return (
		<ul className="flex h-full flex-col gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 dark:divide-darkSecondary">
			{modelsList.map((el, idx) => {
				// opens model details on click
				function handleOpen(): void {
					if (idx === openIndex) {
						setOpenIndex(null);
						return;
					}
					setOpenIndex(idx);
				}

				// selects model as current model in redux store
				function handleSelectModel(modelName: string): void {
					// switch model via modelProvider
					try {
						setModel(modelName);
						toast.success('Model switched');
						// navigate back to chat
						router.push('/chat');
					} catch (err) {
						console.error(err);
						toast.error('Error switching model');
					}
				}

				return (
					<li className="p-2 pr-3 lg:w-2/3 lg:self-center" key={idx}>
						<div className="flex justify-between">
							<div className="flex gap-3 font-light">
								<p className="font-semibold">{el.name}</p>
								<p>{el.details.parameter_size}</p>
							</div>

							<p className="text-sm font-light text-lightTextSecondary dark:text-darkTextSecondary">
								{el.modified_at.split('T')[0]}
							</p>
						</div>

						<div className="mt-1 flex items-center gap-6">
							<p className="font-light text-lightTextSecondary dark:text-darkTextSecondary">
								{(el.size / (1024 * 1024 * 1024)).toFixed(2)} GB
							</p>
							{/* buttons */}
							<div className="flex flex-1 justify-between">
								{' '}
								<Button
									type="secondary"
									onClick={handleOpen}
									className="text-xs !font-medium"
								>
									<IoInformationCircleOutline />

									{idx === openIndex ? 'Close' : 'info'}
								</Button>
								{/* play button */}
								<motion.button
									onClick={() => handleSelectModel(el.name)}
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
						</div>
						{/* info */}
						{openIndex === idx && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								transition={{ duration: 0.2, ease: easeInOut }}
								className="mt-4 flex w-72 flex-col gap-1 lg:w-full"
							>
								<p className="break-words text-xs text-lightTextSecondary dark:text-darkTextSecondary lg:text-sm">
									{el.digest}
								</p>
								<div className="flex items-center gap-20">
									<div className="flex flex-col text-sm">
										<p>
											<span className="text-lightTextSecondary dark:text-darkTextSecondary">
												Family:
											</span>{' '}
											{el.details.family}
										</p>
										<p>
											<span className="text-lightTextSecondary dark:text-darkTextSecondary">
												Format:
											</span>{' '}
											{el.details.format}
										</p>
									</div>
									{/* delete button */}
									<div className="flex flex-col gap-4 lg:flex-row">
										{' '}
										<Button
											type="danger"
											onClick={() => handleDeleteModel(el.name)}
											className="text-xs"
										>
											<FaRegTrashAlt />
											DELETE
										</Button>
										<Link href={`/models/${el.model}`}>
											<Button className="text-xs" type="secondary">
												<FaArrowRight />
												Details
											</Button>
										</Link>
									</div>
								</div>
							</motion.div>
						)}
					</li>
				);
			})}
		</ul>
	);
}

export default ModelDisplay;
