import OpenRouterModelsSearchAndDisplay from '@/components/models/OpenRouterModelsSearchAndDisplay';

export default async function FetchOpenRouterModels() {
	async function getAllOpenRouterModels() {
		const response = await fetch('https://openrouter.ai/api/v1/models');
		if (!response.ok) throw new Error('Error fetching Open Router models');
		const models = await response.json();
		return models;
	}

	const models = await getAllOpenRouterModels();
	// console.log(models.data);

	return <OpenRouterModelsSearchAndDisplay models={models.data} />;
}
