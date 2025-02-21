'use client';

import CopyButton from '@/components/ui/CopyButton';
import { useState, useTransition } from 'react';
import TextExpander from '@/components/ui/TextExpander';
import Button from '@/components/ui/Button';
import { HiOutlineTrash } from 'react-icons/hi';
import { deletePrompt } from '@/lib/actions';
import Link from 'next/link';
import toast from 'react-hot-toast';
import TinySpinner from '../ui/TinySpinner';

export interface Prompts {
	title: string;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}
export default function PromptsSearchAndDisplay({
	prompts,
}: {
	prompts: Prompts[];
}) {
	const [searchvalue, setSearchValue] = useState<string>('');
	const [isPending, startTransition] = useTransition();

	// filtered prompts
	const filteredPrompts = prompts.filter(prompt =>
		prompt.title.toLowerCase().startsWith(searchvalue.toLowerCase().trim())
	);

	// delete prompt from store by id
	function handleDeletePrompt(id: string) {
		if (!window.confirm('Are you sure?')) return;
		startTransition(async () => {
			try {
				await deletePrompt(Number(id));
				toast.success('Prompt deleted');
			} catch (err) {
				console.error(err);
				toast.error('Error deleting prompt');
			}
		});
	}

	// If there are no prompts yet, show a fallback
	if (!prompts.length)
		return (
			<div className="mt-10 flex flex-col items-center gap-4 text-lightTextSecondary dark:text-darkTextSecondary">
				<p className="">Nothing here yet!</p>
				<p className="rounded-md bg-lightSecondary px-2 py-1 dark:bg-darkSecondary">
					Start by creating your first{' '}
					<Link
						href="/prompts/addNew"
						className="text-lightPrimary transition-all duration-150 hover:opacity-70 dark:text-darkPrimary"
					>
						/Prompt!
					</Link>
				</p>
			</div>
		);

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col items-center pr-2">
			{/* search prompts by name */}
			<input
				onChange={e => setSearchValue(e.target.value)}
				placeholder="Search prompts"
				className="mb-2 ml-2 mt-2 w-full rounded-lg bg-lightSecondary px-4 py-3 focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent lg:mb-6 lg:w-1/2 lg:self-center"
				type="text"
			/>

			{/* prompts display */}
			<ul className="flex h-full w-full min-w-full max-w-4xl flex-col gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 dark:divide-darkSecondary">
				{filteredPrompts.map(prompt => {
					return (
						<li
							className="flex w-full max-w-full flex-col gap-2 py-2"
							key={prompt.id}
						>
							<div className="flex items-center justify-between">
								<h3 className="font-semibold">{prompt.title}</h3>
								<CopyButton content={prompt.content} />
							</div>

							<div className="text-lightTextSecondary dark:text-darkTextSecondary">
								<TextExpander body={prompt.content} />
							</div>
							<div className="flex items-center gap-2 self-end">
								<Button
									onClick={() => handleDeletePrompt(prompt.id)}
									type="secondary"
									className="text-sm text-lightError dark:text-darkError"
								>
									{isPending ? <TinySpinner /> : <HiOutlineTrash />}
								</Button>
								<p className="text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary">
									{prompt.createdAt.toLocaleDateString()}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
