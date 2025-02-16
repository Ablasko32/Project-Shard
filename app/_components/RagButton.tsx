import React, { MouseEvent } from 'react';
import Button from '@/app/_components/Button';
import { LuBrain } from 'react-icons/lu';
import { useRagProvider } from '@/app/_components/RagProvider';

export default function RagButton() {
	const { rag, setRag } = useRagProvider();

	return (
		<Button
			onClick={(e: MouseEvent) => {
				e.preventDefault();
				setRag(prev => !prev);
			}}
			type={rag ? 'primary' : 'secondary'}
		>
			<LuBrain />
			Rag
		</Button>
	);
}
