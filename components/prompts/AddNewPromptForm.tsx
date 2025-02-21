'use client';

import Button from '@/components/ui/Button';
import { HiOutlineSparkles } from 'react-icons/hi';
import { addNewPrompt } from '@/lib/actions';
import toast from 'react-hot-toast';
import { useTransition } from 'react';
import TinySpinner from '@/components/ui/TinySpinner';

export default function AddNewPromptForm() {
	const [isPending, startTransition] = useTransition();

	return (
		<form
			action={async formData => {
				startTransition(async () => {
					try {
						await addNewPrompt(formData);
						toast.success('Prompt saved');
					} catch (err) {
						console.error(err);
						toast.error('Error saving prompt');
					}
				});
			}}
			className="flex w-full max-w-3xl flex-col gap-4 px-1"
		>
			<div className="flex flex-col gap-1">
				<label className="text-sm font-semibold lg:text-lg" htmlFor="title">
					Title
				</label>
				<input
					placeholder="Coding problem"
					id="title"
					className="rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					type="text"
					name="title"
					required
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-sm font-semibold lg:text-lg" htmlFor="prompt">
					Prompt
				</label>
				<textarea
					placeholder="What would you like to ask again?"
					id="prompt"
					name="prompt"
					required
					rows={5}
					className="resize-none rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
				/>
			</div>
			{isPending ? (
				<div className="mt-2 flex justify-center">
					<TinySpinner />
				</div>
			) : (
				<Button className="mt-4">
					<HiOutlineSparkles />
					save
				</Button>
			)}
		</form>
	);
}
