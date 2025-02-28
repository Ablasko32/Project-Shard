'use client';
import React, { ChangeEvent, useState } from 'react';
import IndividualOpenRouterModel from '@/components/models/IndividualOpenRouterModel';
import { OpenRouterModel } from '@/types/types';

// search and display open router models
export default function OpenRouterModelsSearchAndDisplay({
	models,
}: {
	models: OpenRouterModel[];
}) {
	const [searchValue, setSearchValue] = useState<string>('');
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const filteredModels = models.filter(model =>
		model.name.toLowerCase().startsWith(searchValue.toLowerCase().trim())
	);
	console.log(filteredModels);

	function handleOpen(idx: number): void {
		if (idx === openIndex) {
			setOpenIndex(null);
			return;
		}
		setOpenIndex(idx);
	}

	return (
		<div className="flex h-full w-full flex-col gap-4">
			<input
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearchValue(e.target.value)
				}
				placeholder="Search models"
				className="mx-4 mb-2 rounded-lg bg-lightSecondary px-4 py-3 focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent lg:mb-6 lg:w-full lg:max-w-[50%] lg:self-center"
				type="text"
			/>
			<ul className="flex h-32 w-full flex-grow flex-col gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 overflow-y-scroll dark:divide-darkSecondary">
				{filteredModels.map((model, idx) => {
					return (
						<IndividualOpenRouterModel
							openIndex={openIndex}
							handleOpen={handleOpen}
							model={model}
							key={idx}
							index={idx}
						/>
					);
				})}
			</ul>
		</div>
	);
}
