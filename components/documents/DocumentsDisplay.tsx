'use client';
import { deleteDocument } from '@/lib/actions';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { HiOutlineTrash } from 'react-icons/hi';
import { useTransition } from 'react';
import TinySpinner from '@/components/ui/TinySpinner';
import { Documents } from '@/app/documents/page';

export default function DocumentsDisplay({
	documents,
}: {
	documents: Documents[];
}) {
	const [isPending, startTransition] = useTransition();

	async function deleteDocumentById(id: number) {
		if (!window.confirm('Are you sure?')) return;
		startTransition(async () => {
			try {
				await deleteDocument(id);
				toast.success('Document deleted');
			} catch (err) {
				toast.error(err);
			}
		});
	}

	return (
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
								onClick={() => deleteDocumentById(document.id)}
								type="secondary"
								className="text-sm text-lightError dark:text-darkError"
							>
								{!isPending ? <HiOutlineTrash /> : <TinySpinner />}
							</Button>
							<p className="text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary">
								{document.createdAt.toLocaleDateString()}
							</p>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
