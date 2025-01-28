'use client';

import CreateModelInput from '@/app/_components/CreateModelInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

export interface CreateModel {
	from: string;
	model: string;
	system?: string;
	seed?: string;
	temperature?: string;
	mirostat_tau?: string;
}

export default function CreateModelForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateModel>();

	const onSubmit: SubmitHandler<CreateModel> = async data => {
		console.log(data);
		const result = await fetch('http://localhost:11434/api/create', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({
				model: data.model.trim(),
				from: data.from.trim(),
				system: data.system ? data.system.trim() : '',
				parameters: {
					temperature: Number(data.temperature),
					seed: Number(data.seed),
					mirostat_tau: Number(data.mirostat_tau),
				},
			}),
		});
		if (!result.ok) {
			throw new Error('Error creating model');
		}
		const responseBody = await result.text();
		console.log(responseBody);
		window.alert('MODEL CREATED');

		console.log(result);
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<CreateModelInput
				register={register}
				description="Name of the model"
				id="model"
				placeholder="Name"
				name="name"
				validation={{ required: 'Name is required!' }}
				errors={errors.model?.message}
			/>

			<CreateModelInput
				register={register}
				description="Name of the model to serve as base."
				id="from"
				placeholder="Base model"
				name="Base model"
				validation={{ required: 'Base model is required!' }}
				errors={errors.from?.message}
			/>

			<CreateModelInput
				register={register}
				description="The default system message.This customizes the model."
				id="system"
				placeholder="You are a hepful assistant."
				name="System Message"
				textArea
			/>

			{/* params part */}
			<div className="flex flex-col gap-1">
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
				register={register}
				description="Increasing the temperature will make the model answer more
              creatively.(default 0.8)"
				id="temperature"
				placeholder="Temperature"
				name="Temperature"
			/>

			<CreateModelInput
				register={register}
				description="Setting this to a specific number will make the model generate the
              same text for the same prompt. (Default: 0)"
				id="seed"
				placeholder="Seed"
				name="Seed"
			/>
			<CreateModelInput
				register={register}
				description="Controls the balance between coherence and diversity of the output. A lower value will result in more focused and coherent text. (Default: 5.0)"
				id="mirostat_tau"
				placeholder="mirostat tau"
				name="mirostat tau"
			/>

			<motion.button
				whileHover={{ scale: 0.95 }}
				whileTap={{ scale: 0.9 }}
				transition={{ duration: 0.15 }}
				type="submit"
				className="mx-auto mb-4 mt-2 rounded-md bg-lightPrimary px-4 py-1 font-semibold text-lightBg dark:bg-darkPrimary dark:text-darkBg"
			>
				CREATE
			</motion.button>
		</form>
	);
}
