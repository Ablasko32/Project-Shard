import React from 'react';
import { type Metadata } from 'next';
import ModelSearchAndDisplay from '@/components/models/ModelSearchAndDisplay';
import { getAllOllamaModels } from '@/lib/ollamaApi';

export const metadata: Metadata = {
	title: 'My Models',
};

export default async function page() {
	// List of all models

	const models = await getAllOllamaModels();

	return (
		<div className="h-full max-h-full">
			<ModelSearchAndDisplay models={models.models} />
		</div>
	);
}
