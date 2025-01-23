'use client';
import { Model } from '@/app/types/types';
import ModelDisplay from '@/app/_components/ModelDisplay';
import { ChangeEvent, useState } from 'react';

export default function ModelSearchAndDisplay({ models }: { models: Model[] }) {
	const [searchValue, setSearchValue] = useState<string>('');

	const filteredModels = models.filter(model =>
		model.name.startsWith(searchValue.toLowerCase())
	);

	return (
		<>
			<div className="flex flex-col">
				<div className="flex justify-center">
					<input
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setSearchValue(e.target.value)
						}
						placeholder="Search models"
						className="bg-lightSecondary dark:bg-darkSecondary dark:focus:ring-darkAccent focus:ring-lightAccent mx-4 mb-2 flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring lg:max-w-[50%]"
						type="text"
					/>
				</div>
			</div>
			<ModelDisplay modelsList={filteredModels} />
		</>
	);
}
