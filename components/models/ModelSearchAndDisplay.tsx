'use client';
import { Model } from '@/types/types';
import ModelDisplay from '@/components/models/ModelDisplay';
import { ChangeEvent, useState } from 'react';

export default function ModelSearchAndDisplay({ models }: { models: Model[] }) {
	const [searchValue, setSearchValue] = useState<string>('');

	const filteredModels = models.filter(model =>
		model.name.startsWith(searchValue.toLowerCase().trim())
	);

	return (
		<>
			<div className="flex w-full flex-col">
				<input
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSearchValue(e.target.value)
					}
					placeholder="Search models"
					className="mx-4 mb-2 rounded-lg bg-lightSecondary px-4 py-3 focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent lg:mb-6 lg:w-full lg:max-w-[50%] lg:self-center"
					type="text"
				/>
			</div>
			<ModelDisplay modelsList={filteredModels} />
		</>
	);
}
