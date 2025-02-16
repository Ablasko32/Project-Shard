import React from 'react';
import { getAllDocuments } from '@/app/_lib/actions';
import Button from '@/app/_components/Button';
import { HiOutlineTrash } from 'react-icons/hi';
import Link from 'next/link';

interface Documents {
	id: number;
	name: string;
	extension: string;
	size: number;
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
			<ul className="mx-auto flex h-32 w-full max-w-6xl flex-grow flex-col items-center gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 dark:divide-darkSecondary">
				{documents.map(document => {
					return (
						<li
							key={document.id}
							className="flex w-full flex-col gap-2 py-2 pr-4"
						>
							<h2 className="font-semibold">{document.name}</h2>

							<p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary">
								Size: {document.size} Bytes
							</p>
							<div className="flex items-center gap-2 self-end">
								<Button
									type="secondary"
									className="text-sm text-lightError dark:text-darkError"
								>
									<HiOutlineTrash />
								</Button>
								<p className="text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary">
									{document.createdAt.toLocaleDateString()}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
