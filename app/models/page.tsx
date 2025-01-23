import ollama from 'ollama';
import React from 'react';
import { type Metadata } from 'next';
import ModelSearchAndDisplay from '../_components/ModelSearchAndDisplay';

export const metadata: Metadata = {
	title: 'My Models',
};

export async function page() {
	// List of all models
	const modelsList = await ollama.list();
	const models = modelsList.models;

	return (
		<div className="h-full max-h-full">
			<ModelSearchAndDisplay models={models} />
		</div>
	);
}

export default page;
