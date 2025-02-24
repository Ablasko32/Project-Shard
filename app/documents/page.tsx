import React from 'react';
import { getAllDocuments } from '@/lib/dbOperations';
import Link from 'next/link';

import DocumentsDisplay from '@/components/documents/DocumentsDisplay';

export interface Documents {
	id: number;
	name: string;
	extension: string | null;
	size: number | null;
	createdAt: Date;
}

export default async function page() {
	const documents: Documents[] = await getAllDocuments();
	// console.log(documents);

	// If there are no documents yet, show a fallback
	if (!documents.length)
		return (
			<div className="mt-10 flex flex-col items-center gap-4 text-lightTextSecondary dark:text-darkTextSecondary">
				<p className="">Nothing here yet!</p>
				<p className="rounded-md bg-lightSecondary px-2 py-1 dark:bg-darkSecondary">
					Start by uploading your first{' '}
					<Link
						href="/documents/upload"
						className="text-lightPrimary transition-all duration-150 hover:opacity-70 dark:text-darkPrimary"
					>
						/Document!
					</Link>
				</p>
			</div>
		);

	return (
		<div className="flex h-full flex-col gap-4 overflow-y-scroll">
			<DocumentsDisplay documents={documents} />
		</div>
	);
}
