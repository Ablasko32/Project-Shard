'use client';

import CopyButton from '@/app/_components/CopyButton';
import { useState } from 'react';
import TextExpander from '@/app/_components/TextExpander';
import Button from '@/app/_components/Button';
import { HiOutlineTrash } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { deletePrompt } from '@/app/prompts/promptsSlice';

export default function PromptsSearchAndDisplay() {
	const [searchvalue, setSearchValue] = useState<string>('');

	const dispatch = useDispatch();

	const prompts = useSelector((store: RootState) => store.prompts);

	// filtered prompts
	const filteredPrompts = prompts.filter(prompt =>
		prompt.title.toLowerCase().startsWith(searchvalue.toLowerCase().trim())
	);

	// delete prompt from store by id
	function handleDeletePrompt(id: string) {
		if (!window.confirm('Are you sure?')) return;
		dispatch(deletePrompt({ id: id }));
	}

	return (
		<div className="flex h-32 w-full min-w-full max-w-full flex-grow flex-col items-center overflow-x-hidden overflow-y-scroll p-3">
			{/* search prompts by name */}
			<input
				onChange={e => setSearchValue(e.target.value)}
				placeholder="Search prompts"
				className="mx-4 mb-2 w-full max-w-[92%] rounded-lg bg-lightSecondary px-4 py-3 focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent lg:mb-6 lg:w-full lg:max-w-[50%] lg:self-center"
				type="text"
			/>

			{/* prompts display */}
			<ul className="flex h-full w-full max-w-4xl flex-col gap-4 divide-y-2 divide-lightSecondary divide-opacity-50 dark:divide-darkSecondary">
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
									<HiOutlineTrash />
								</Button>
								<p className="text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary">
									{prompt.date}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
