import React, { MouseEvent } from 'react';
import Button from '@/components/ui/Button';
import { LuBrain } from 'react-icons/lu';
import { useRagProvider } from '@/contexts/RagProvider';

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
