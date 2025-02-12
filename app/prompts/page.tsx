import PromptsSearchAndDisplay from '@/app/_components/PromptsSearchAndDisplay';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My Prompts',
};

export default function page() {
	return <PromptsSearchAndDisplay />;
}
