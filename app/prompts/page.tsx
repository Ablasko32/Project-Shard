import PromptsSearchAndDisplay from '@/components/prompts/PromptsSearchAndDisplay';
import { Metadata } from 'next';
import { getAllPrompts } from '@/lib/dbOperations';

export const metadata: Metadata = {
	title: 'My Prompts',
};

export default async function page() {
	const prompts = await getAllPrompts();

	return <PromptsSearchAndDisplay prompts={prompts} />;
}
