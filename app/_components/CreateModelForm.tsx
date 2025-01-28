'use client';

import CreateModelInput from '@/app/_components/CreateModelInput';

export default function CreateModelForm() {
	return (
		<form className="flex flex-col gap-4">
			<CreateModelInput
				description="Name of the model"
				id="name"
				placeholder="Name"
				name="name"
			/>

			<CreateModelInput
				description="Name of the model to serve as base."
				id="from"
				placeholder="Base model"
				name="Base model"
			/>

			<CreateModelInput
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
					<p className="h-0.5 flex-grow rounded-md bg-lightPrimary opacity-50 dark:bg-darkPrimary"></p>
					<p className="font-semibold capitalize lg:text-xl">parameters</p>
					<p className="h-0.5 flex-grow rounded-md bg-lightPrimary opacity-50 dark:bg-darkPrimary"></p>
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
				name="Temperature"
			/>

			<CreateModelInput
				description="Setting this to a specific number will make the model generate the
              same text for the same prompt. (Default: 0)"
				id="seed"
				placeholder="Seed"
				name="Seed"
			/>
			<CreateModelInput
				description="Controls the balance between coherence and diversity of the output. A lower value will result in more focused and coherent text. (Default: 5.0)"
				id="mirostat_tau"
				placeholder="mirostat tau"
				name="mirostat tau"
			/>

			<button
				type="submit"
				className="mx-auto mb-4 mt-2 rounded-md bg-lightPrimary px-4 py-1 text-lightBg dark:bg-darkPrimary dark:text-darkBg"
			>
				CREATE
			</button>
		</form>
	);
}
