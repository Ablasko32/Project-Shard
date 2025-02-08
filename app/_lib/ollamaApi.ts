import { revalidatePathAction } from '@/app/_lib/actions';
import toast from 'react-hot-toast';
import { Model } from '@/app/_types/types';

//Deletes model by name
export async function deleteOllamaModel(modelName: string): Promise<void> {
	const result = await fetch('api/proxy/api/delete', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ model: modelName }),
	});
	if (result.ok) {
		revalidatePathAction('/models');
		toast.success('Model deleted');
	} else {
		toast.error('Failed to delete model');
	}
}

//Gets all models
export async function getAllOllamaModels(): Promise<{ models: Model[] }> {
	const result = await fetch('http://localhost:3000/api/proxy/api/tags');
	if (!result.ok) {
		throw new Error('Error fetching models');
	}
	const models: { models: Model[] } = await result.json();
	return models;
}

//Get info for one model
export async function getOllamaModelInfo(
	modelName: string
): Promise<Record<string, any>> {
	try {
		const response = await fetch('http://localhost:3000/api/proxy/api/show', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model: modelName,
			}),
		});
		if (!response.ok) {
			throw new Error('Error to fetch model details');
		}
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		throw new Error('Error fetching model details');
	}
}

// Create a model
export async function createModel(
	processedData: Record<string, any>
): Promise<void> {
	const { model, from, system = null, ...rest } = processedData;
	try {
		const result = await fetch('/api/proxy/api/create', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({
				model: model,
				from: from,
				system: system,
				parameters: {
					...rest,
				},
			}),
		});
		if (!result.ok) {
			throw new Error('Error creating model');
		}
	} catch (err) {
		throw new Error('Error creating model');
	}
}
