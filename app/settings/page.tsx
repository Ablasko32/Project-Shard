import React from 'react';
import CreateModelInput from '../_components/CreateModelInput';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

export default function page() {
	return (
		<div className="pageContainer flex flex-col items-center gap-4">
			<h2 className="mb-2 self-start text-center text-xl font-bold lg:text-3xl">
				My Settings
			</h2>
			<form className="flex w-full flex-col gap-4 lg:w-[70%]">
				<div>
					<CreateModelInput
						description="Ollama connection URL"
						id="url"
						placeholder="http://localhost:11434"
						name="Ollama url"
					/>
					<button className="bg-green-200">TEST Connection</button>
				</div>

				<CreateModelInput
					description="Your name"
					id="name"
					placeholder="Mark"
					name="Your name"
				/>
				<CreateModelInput
					description="Default system message to customize the behavior."
					id="system"
					placeholder="You are a helpful Assistant."
					name="Default system message"
					textArea
				/>
			</form>

			{/* docs */}
			<div className="mt-10 max-w-sm self-center rounded-md bg-lightSecondary px-2 py-1 text-center text-sm text-lightTextSecondary dark:bg-darkSecondary dark:text-darkTextSecondary">
				Visit official{' '}
				<a
					className="text-lightPrimary transition-all duration-150 hover:opacity-80 dark:text-darkPrimary"
					href="https://github.com/Ablasko32"
					target="_blank"
				>
					Documentation.
				</a>
			</div>

			<p className="text-center text-xs font-light italic text-lightTextSecondary/60 dark:text-darkTextSecondary/60">
				&quot;Make AI Free again&quot;
			</p>
		</div>
	);
}
