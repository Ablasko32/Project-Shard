import AddNewPromptForm from '@/app/_components/AddNewPromptForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My Prompts-Add New',
};

export default function page() {
	return (
		<div className="mt-6 flex justify-center">
			<AddNewPromptForm />
		</div>
	);
}
