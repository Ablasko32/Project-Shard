'use client';
import { Model } from '../types/types';
import { LuPlay } from 'react-icons/lu';
import { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import { easeInOut, motion } from 'framer-motion';
import { PiInfoLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { switchModel } from '../models/modelSlice';
import { useRouter } from 'next/navigation';
import { deleteModel } from '../actions';

function ModelDisplay({ modelsList }: { modelsList: Model[] }) {
	// console.log(modelsList);

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const dispatch = useDispatch();

	const router = useRouter();

	async function handleDeleteModel(modelName: string) {
		if (!window.confirm('Are you sure')) return;
		const result = await deleteModel(modelName);
		console.log('deletin', result);
	}

	return (
		<ul className="flex h-full flex-col gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 dark:divide-darkSecondary">
			{modelsList.map((el, idx) => {
				function handleOpen(): void {
					if (idx === openIndex) {
						setOpenIndex(null);
						return;
					}
					setOpenIndex(idx);
				}

				function handleSelectModel(modelName: string): void {
					// dispatch new name to store
					dispatch(switchModel(modelName));
					window.alert(`Model set to: ${modelName}`);
					// navigate back to chat
					router.push('/');
				}

				return (
					<li className="p-2 lg:w-2/3 lg:self-center" key={idx}>
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
								<motion.button
									whileHover={{
										scale: 0.95,
										transition: { duration: 0.1 },
									}}
									whileTap={{ scale: 0.9 }}
									onClick={handleOpen}
									className="flex items-center gap-1 rounded-xl bg-lightSecondary px-2 py-1 text-sm uppercase transition-all duration-150 hover:opacity-80 dark:bg-darkSecondary"
								>
									<PiInfoLight />
									<span className="text-xs">
										{idx === openIndex ? 'Close' : 'info'}
									</span>
								</motion.button>
								<motion.button
									onClick={() => handleSelectModel(el.name)}
									whileHover={{
										scale: 0.95,
										transition: { duration: 0.1 },
									}}
									whileTap={{ scale: 0.85 }}
									className="rounded-full bg-lightPrimary p-2 text-lightBg transition-all duration-150 dark:bg-darkPrimary dark:text-darkBg"
								>
									<LuPlay />
								</motion.button>
							</div>
						</div>
						{/* info */}
						{openIndex === idx && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								transition={{ duration: 0.2, ease: easeInOut }}
								className="mt-4 flex flex-col gap-1"
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
									<motion.button
										onClick={() => handleDeleteModel(el.name)}
										whileHover={{
											scale: 0.95,
											transition: { duration: 0.1 },
										}}
										whileTap={{ scale: 0.85 }}
										className="bg-lightError dark:bg-darkError flex items-center gap-1 rounded-lg px-2 py-1 text-xs uppercase text-lightBg dark:text-darkBg"
									>
										<CiTrash />
										DELETE
									</motion.button>
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
