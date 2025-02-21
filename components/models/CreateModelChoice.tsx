'use client';

import Button from '@/components/ui/Button';
import CreateModelForm from '@/components/models/CreateModelForm';
import { useState } from 'react';
import { LuFolderInput } from 'react-icons/lu';
import CreateModelFromFile from './CreateModelFromFile';

export default function CreateModelChoice() {
	const [createFromFile, setCreateFromFile] = useState<boolean>(false);

	return (
		<div className="mb-6">
			<Button
				onClick={(): void => setCreateFromFile(prev => !prev)}
				className="mx-auto mb-2 text-xs"
			>
				<LuFolderInput />
				{!createFromFile ? 'From file' : 'With guide'}
			</Button>

			{/* tu ide logika za upload fajla */}
			{createFromFile && <CreateModelFromFile />}

			{!createFromFile && <CreateModelForm />}
			{/* <CreateModelForm /> */}
		</div>
	);
}
