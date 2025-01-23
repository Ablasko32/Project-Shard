'use client';
import { AiOutlineInfo } from 'react-icons/ai';
import { Model } from '../types/types';
import { LuPlay } from 'react-icons/lu';
import { useState } from 'react';

function ModelDisplay({ modelsList }: { modelsList: Model[] }) {
	// console.log(modelsList);

	const [isInfoOpen, setInfoOpen] = useState<boolean>(false);

	return (
		<ul className="divide-lightSecondary dark:divide-darkSecondary flex h-full flex-col gap-4 divide-y-2 divide-opacity-50 overflow-y-scroll">
			{modelsList.map((el, idx) => {
				return (
					<li className="p-2 lg:w-2/3 lg:self-center" key={idx}>
						<div className="flex justify-between">
							<div className="flex gap-3 font-light">
								<p className="font-semibold">{el.name}</p>
								<p>{el.details.parameter_size}</p>
							</div>

							<p className="text-lightTextSecondary dark:text-darkTextSecondary text-sm font-light">
								{el.modified_at.split('T')[0]}
							</p>
						</div>

						<div className="mt-1 flex items-center gap-6">
							<p className="text-lightTextSecondary dark:text-darkTextSecondary font-light">
								{(el.size / (1024 * 1024 * 1024)).toFixed(2)} GB
							</p>
							{/* buttons */}
							<div className="flex flex-1 justify-between">
								{' '}
								<button
									onClick={() => setInfoOpen(prev => !prev)}
									className="bg-lightSecondary dark:bg-darkSecondary flex items-center rounded-xl px-4 py-1 text-sm uppercase transition-all duration-150 hover:opacity-80"
								>
									<AiOutlineInfo />
									<span className="text-xs">
										{isInfoOpen ? 'Close' : 'Info'}
									</span>
								</button>
								<button className="bg-lightPrimary dark:bg-darkPrimary text-lightBg dark:text-darkBg rounded-full p-2 transition-all duration-150 hover:opacity-80">
									<LuPlay />
								</button>
							</div>
						</div>
						{/* info */}
						{isInfoOpen && <div>Info placeholder</div>}
					</li>
				);
			})}
		</ul>
	);
}

export default ModelDisplay;
