import ollama from 'ollama';
import React from 'react';
import { type Metadata } from 'next';
import ModelSearchAndDisplay from '../_components/ModelSearchAndDisplay';

export const metadata: Metadata = {
	title: 'My Models',
};

export async function page() {
	// List of all models
	let models;
	try {
		const modelsList = await ollama.list();

		models = modelsList.models;
	} catch (err) {
		throw new Error('Error fetching models');
	}

	return (
		<div className="h-full max-h-full">
			<ModelSearchAndDisplay models={models} />
		</div>
	);
}

export default page;
