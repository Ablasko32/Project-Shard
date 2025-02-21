import { Metadata } from 'next';
import DocumentUpload from '@/components/documents/DocumentUpload';
import CopyButton from '@/components/ui/CopyButton';
import { GoAlert } from 'react-icons/go';
// import RagTest from "@/app/_components/RagTest';

export const metadata: Metadata = {
	title: 'My documents-Upload New',
};

export default function page() {
	return (
		<div className="flex flex-col gap-10">
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
			<div className="flex max-w-sm items-center justify-center gap-1 self-center rounded-md bg-lightSecondary px-2 py-1 text-sm text-lightTextSecondary dark:bg-darkSecondary dark:text-darkTextSecondary">
				<p className="flex items-center gap-1">
					<GoAlert />
					Requires:
				</p>
				<a
					href="https://ollama.com/library/nomic-embed-text/blobs/970aa74c0a90"
					target="_blank"
					className="mr-2 font-semibold text-lightPrimary opacity-80 transition-all duration-150 hover:opacity-70 dark:text-darkPrimary"
				>
					/nomic-embed-text
				</a>
				<CopyButton content="nomic-embed-text" />
			</div>
			{/* rag test development */}
			{/* <RagTest /> */}
		</div>
	);
}
