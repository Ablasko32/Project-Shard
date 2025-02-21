'use client';
import React, { createContext, useContext, useState } from 'react';

interface IRagContext {
	rag: boolean;
	setRag: () => void;
}

const RagContext = createContext<IRagContext>({
	rag: false,
	setRag: () => {},
});

export default function RagProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [rag, setRag] = useState<boolean>(false);

	return <RagContext value={{ rag, setRag }}>{children}</RagContext>;
}

export function useRagProvider() {
	const context = useContext(RagContext);
	if (!context) {
		throw new Error('Use model provider used outside of context!');
	}
	return context;
}
