'use client';

import CreateModelInput from '@/components/models/CreateModelInput';
import TinySpinner from '@/components/ui/TinySpinner';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { HiOutlineSparkles } from 'react-icons/hi';
import { createModelAction } from '@/lib/actions';
import { useTransition } from 'react';

export default function CreateModelForm() {
	const [isPending, startTransition] = useTransition();

	return (
		<form
			action={async formData => {
				startTransition(async () => {
					try {
						await createModelAction(formData);
						toast.success('Model created');
					} catch (err) {
						console.log(err);
						toast.error('Error creating model');
					}
				});
			}}
			className="flex flex-col gap-8 pr-1 lg:gap-10"
			// onSubmit={handleSubmit(onSubmit)}
		>
			<CreateModelInput
				description="Name of the model"
				id="model"
				placeholder="Name"
				title="name"
				name="model"
			/>

			<CreateModelInput
				description="Name of the model to serve as base."
				id="from"
				placeholder="Base model"
				title="Base model"
				name="from"
			/>

			<CreateModelInput
				description="The default system message.This customizes the model."
				id="system"
				placeholder="You are a hepful assistant."
				title="System Message"
				name="system"
				textArea
			/>

			{/* params part */}
			<div className="mb-6 mt-8 flex flex-col gap-1">
				{' '}
				<div className="mt-1 flex items-center gap-1">
					<p className="h-0.5 flex-grow rounded-md bg-lightPrimary !opacity-20 dark:bg-darkPrimary"></p>
					<p className="font-semibold capitalize lg:text-xl">parameters</p>
					<p className="h-0.5 flex-grow rounded-md bg-lightPrimary !opacity-20 dark:bg-darkPrimary"></p>
				</div>
				<p className="mx-4 mb-1 text-center text-xs text-lightTextSecondary dark:text-darkTextSecondary lg:text-sm">
					Parameters allow you to tweek the model performance.{' '}
				</p>
			</div>

			<CreateModelInput
				description="Increasing the temperature will make the model answer more
              creatively.(default 0.8)"
				id="temperature"
				placeholder="Temperature"
				title="Temperature"
				name="temperature"
				type="number"
			/>

			<CreateModelInput
				description="Setting this to a specific number will make the model generate the
              same text for the same prompt. (Default: 0)"
				id="seed"
				placeholder="Seed"
				title="Seed"
				name="seed"
				type="number"
			/>
			<CreateModelInput
				description="Controls the balance between coherence and diversity of the output. A lower value will result in more focused and coherent text. (Default: 5.0)"
				id="mirostat_tau"
				placeholder="mirostat tau"
				title="mirostat tau"
				name="mirostat_tau"
				type="number"
			/>
			<CreateModelInput
				description="Influences how quickly the algorithm responds to feedback from the generated text. A lower learning rate will result in slower adjustments, while a higher learning rate will make the algorithm more responsive. (Default: 0.1)"
				id="mirostat_eta"
				placeholder="mirostat eta"
				title="mirostat eta"
				name="mirostat_eta"
				type="number"
			/>
			<CreateModelInput
				description="Sets the size of the context window used to generate the next token. (Default: 2048)"
				id="num_ctx"
				placeholder="Num ctx"
				title="Num Ctx"
				name="num_ctx"
				type="number"
			/>
			<CreateModelInput
				description="Reduces the probability of generating nonsense. A higher value (e.g. 100) will give more diverse answers, while a lower value (e.g. 10) will be more conservative. (Default: 40)"
				id="top_k"
				placeholder="top_k"
				title="top k"
				name="top_k"
				type="number"
			/>
			<CreateModelInput
				description="Works together with top-k. A higher value (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text. (Default: 0.9)"
				id="top_p"
				placeholder="top_p"
				title="top p"
				name="top_p"
				type="number"
			/>

			{isPending ? (
				<div className="flex items-center justify-center">
					<TinySpinner />
				</div>
			) : (
				<Button className="mx-auto mb-4 mt-2">
					<HiOutlineSparkles />
					Create
				</Button>
			)}
		</form>
	);
}
