import { Metadata } from 'next';
import DocumentUpload from '@/app/_components/DocumentUpload';

export const metadata: Metadata = {
	title: 'My documents',
};

export default function page() {
	return (
		<div className="pageContainer flex flex-col gap-10">
			<h2 className="text-xl font-bold capitalize lg:text-3xl">My documents</h2>
			{/* file upload */}
			<DocumentUpload />

			{/* explanatory  */}
			<div className="flex flex-col gap-2">
				<div className="max-w-sm self-center rounded-md bg-lightSecondary px-2 py-1 text-center text-sm text-lightTextSecondary dark:bg-darkSecondary dark:text-darkTextSecondary">
					<p>
						Here you can upload files to serve as knowledge base for the model.
					</p>
				</div>
				<p className="text-center text-xs text-lightTextSecondary dark:text-darkTextSecondary">
					Supports:{' '}
					<span className="font-semibold text-lightPrimary opacity-80 dark:text-darkPrimary">
						.txt
					</span>{' '}
					<span className="font-semibold text-lightPrimary opacity-80 dark:text-darkPrimary">
						.pdf
					</span>{' '}
					<span className="font-semibold text-lightPrimary opacity-80 dark:text-darkPrimary">
						.docx
					</span>
				</p>
			</div>
		</div>
	);
}
