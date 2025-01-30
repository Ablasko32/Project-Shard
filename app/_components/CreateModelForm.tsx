'use client';

import CreateModelInput from '@/app/_components/CreateModelInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TinySpinner from './TinySpinner';
import toast from 'react-hot-toast';

export interface CreateModel {
	from: string;
	model: string;
	system?: string;
	seed?: string | number;
	temperature?: string | number;
	mirostat_tau?: string | number;
	num_ctx?: string | number;
	mirostat_eta?: string | number;
	top_k?: string | number;
	top_p?: string | number;
}

export default function CreateModelForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateModel>();

	const [isLoading, setLoading] = useState<boolean>(false);

	const onSubmit: SubmitHandler<CreateModel> = async data => {
		// process data for unused values
		const processedData: Record<string, string | number> = Object.entries(
			data
		).reduce(
			(acc, [key, value]) => {
				if (value && value.trim().length) {
					if (
						[
							'temperature',
							'seed',
							'mirostat_tau',
							'num_ctx',
							'top_k',
							'top_p',
							'mirostat_eta',
						].includes(key)
					) {
						acc[key] = parseFloat(value);
						console.log('HERE', acc[key]);
					} else {
						acc[key] = value;
					}
				}
				return acc;
			},
			{} as Record<string, string | number>
		);

		// console.log(processedData);

		try {
			const { model, from, system = null, ...rest } = processedData;
			// console.log(rest);
			setLoading(true);
			const result = await fetch('/api/proxy/api/create', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({
					model: model,
					from: from,
					system: system,
					parameters: {
						...rest,
					},
				}),
			});
			if (!result.ok) {
				throw new Error('Error creating model');
			}
			const responseBody = await result.text();
			// console.log(responseBody);
			toast.success('Model created sucesfully');

			// console.log(result);
		} catch (err) {
			console.error(err);
			toast.error('Error creating model');
		} finally {
			setLoading(false);
		}
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
			<CreateModelInput
				register={register}
				description="Influences how quickly the algorithm responds to feedback from the generated text. A lower learning rate will result in slower adjustments, while a higher learning rate will make the algorithm more responsive. (Default: 0.1)"
				id="mirostat_eta"
				placeholder="mirostat eta"
				name="mirostat eta"
			/>
			<CreateModelInput
				register={register}
				description="Sets the size of the context window used to generate the next token. (Default: 2048)"
				id="num_ctx"
				placeholder="Num ctx"
				name="Num Ctx"
			/>
			<CreateModelInput
				register={register}
				description="Reduces the probability of generating nonsense. A higher value (e.g. 100) will give more diverse answers, while a lower value (e.g. 10) will be more conservative. (Default: 40)"
				id="top_k"
				placeholder="top_k"
				name="top k"
			/>
			<CreateModelInput
				register={register}
				description="Works together with top-k. A higher value (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text. (Default: 0.9)"
				id="top_p"
				placeholder="top_p"
				name="top p"
			/>

			{/* loading */}
			{isLoading && (
				<div className="flex justify-center">
					<TinySpinner />
				</div>
			)}
			<motion.button
				disabled={isLoading}
				whileHover={{ scale: 0.95 }}
				whileTap={{ scale: 0.9 }}
				transition={{ duration: 0.15 }}
				type="submit"
				className="mx-auto mb-4 mt-2 rounded-md bg-lightPrimary px-4 py-1 font-semibold uppercase text-lightBg dark:bg-darkPrimary dark:text-darkBg"
			>
				Create
			</motion.button>
		</form>
	);
}
