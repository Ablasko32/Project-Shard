import React from 'react';
import { type Metadata } from 'next';
import ModelSearchAndDisplay from '../_components/ModelSearchAndDisplay';
import { getAllOllamaModels } from '@/app/_lib/ollamaApi';

export const metadata: Metadata = {
	title: 'My Models',
};

export async function page() {
	// List of all models

	const models = await getAllOllamaModels();

	return (
		<div className="h-full max-h-full">
			<ModelSearchAndDisplay models={models.models} />
		</div>
	);
}

export default page;
