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
			className="w-sm cursor-pointer rounded-md border border-lightPrimary px-2 py-1 capitalize focus:outline-none dark:border-darkPrimary"
		>
			<option value="ollama">Ollama</option>
			<option value="openRouter">OpenRouter</option>
		</select>
	);
}
