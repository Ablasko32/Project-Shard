'use client';

import { useAIProvider } from '@/contexts/AiProviderProvider';
import { ChangeEvent } from 'react';

// Select efault AI provider dispatch action to context on change
export default function ChooseProviderSelect() {
	const { provider, setProvider } = useAIProvider();
	// console.log('PROVIDER', provider);

	return (
		<select
			value={provider}
			onChange={(e: ChangeEvent<HTMLSelectElement>) =>
				setProvider(e.target.value)
			}
			className="w-sm cursor-pointer rounded-md border border-lightPrimary bg-lightBg px-2 py-1 font-semibold capitalize focus:outline-none dark:border-darkPrimary dark:bg-darkBg"
		>
			<option value="ollama">Ollama</option>
			<option value="openRouter">OpenRouter</option>
		</select>
	);
}
