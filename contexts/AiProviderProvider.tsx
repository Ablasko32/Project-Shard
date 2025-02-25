'use client';

import React, { createContext, useContext, useState } from 'react';

interface IProviderContext {
	provider: string;
	setProvider: (provider: string) => void;
}
const ProviderContext = createContext<IProviderContext>({
	provider: 'ollama',
	setProvider: () => {},
});

// Provides the default AI provider and setter function
export default function AiProviderProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [provider, setProvider] = useState<string>('ollama');

	return (
		<ProviderContext value={{ provider, setProvider }}>
			{children}
		</ProviderContext>
	);
}

export function useAIProvider() {
	const context = useContext(ProviderContext);
	if (!context) {
		throw new Error('Use AI provider used outside of context!');
	}
	return context;
}
