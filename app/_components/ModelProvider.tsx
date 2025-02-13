'use client';
import React, { createContext, useContext, useState } from 'react';

interface IModelContext {
	model: string;
	setModel: (model: string) => void;
}

const ModelContext = createContext<IModelContext>({
	model: 'Select a model',
	setModel: () => {},
});

// Model context provider provides acess to model and setter function
export default function ModelProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [model, setModel] = useState<string>('Select a model');

	return <ModelContext value={{ model, setModel }}>{children}</ModelContext>;
}

export function useModelProvider() {
	const context = useContext(ModelContext);
	if (!context) {
		throw new Error('Use model provider used outside of context!');
	}
	return context;
}
