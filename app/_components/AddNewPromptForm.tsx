'use client';

import Button from '@/app/_components/Button';
import { useForm } from 'react-hook-form';
import { GoAlert } from 'react-icons/go';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addNewPrompt } from '@/app/prompts/promptsSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AddPrompt {
	title: string;
	prompt: string;
}

export default function AddNewPromptForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddPrompt>();

	const dispatch = useDispatch();
	const router = useRouter();

	function onSubmit(data: AddPrompt) {
		if (!data.title || !data.prompt) return;
		console.log(data);
		try {
			dispatch(addNewPrompt({ title: data.title, content: data.prompt }));
			toast.success('Prompt saved');
			router.push('/prompts');
		} catch (err) {
			console.error(err);
			toast.error('Error saving prompt');
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full max-w-3xl flex-col gap-4 px-1"
		>
			<div className="flex flex-col gap-1">
				<label className="text-sm font-semibold lg:text-lg" htmlFor="title">
					Title
				</label>
				<input
					{...register('title', {
						required: 'Title is required!',
						maxLength: { value: 20, message: 'Title is too long!' },
					})}
					placeholder="Coding problem"
					id="title"
					className="rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					type="text"
				/>
				{errors?.title && (
					<p className="flex items-center justify-center gap-1 text-xs font-light text-lightError dark:text-darkError">
						<GoAlert />
						{errors.title.message}
					</p>
				)}
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-sm font-semibold lg:text-lg" htmlFor="prompt">
					Prompt
				</label>
				<textarea
					{...register('prompt', { required: 'Prompt is required!' })}
					placeholder="What would you like to ask again?"
					id="prompt"
					rows={5}
					className="resize-none rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
				/>
				{errors?.prompt && (
					<p className="flex items-center justify-center gap-1 text-xs font-light text-lightError dark:text-darkError">
						<GoAlert />
						{errors.prompt.message}
					</p>
				)}
			</div>

			<Button className="mt-4">
				<HiOutlineSparkles />
				save
			</Button>
		</form>
	);
}
