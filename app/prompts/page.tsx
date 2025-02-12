import PromptsSearchAndDisplay from '@/app/_components/PromptsSearchAndDisplay';
import { Metadata } from 'next';
import { getAllPrompts } from '@/app/_lib/actions';

export const metadata: Metadata = {
	title: 'My Prompts',
};

export default async function page() {
	const prompts = await getAllPrompts();

	return <PromptsSearchAndDisplay prompts={prompts} />;
}
