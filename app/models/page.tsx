import React from 'react';
import { type Metadata } from 'next';
import ModelSearchAndDisplay from '../_components/ModelSearchAndDisplay';
import { Model } from '../types/types';

export const metadata: Metadata = {
	title: 'My Models',
};

export async function page() {
	// List of all models

	const result = await fetch('http://localhost:3000/api/proxy/api/tags');
	if (!result.ok) {
		throw new Error('Error fetching models');
	}
	const models: { models: Model[] } = await result.json();

	return (
		<div className="h-full max-h-full">
			<ModelSearchAndDisplay models={models.models} />
		</div>
	);
}

export default page;
