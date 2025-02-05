'use client';

import Button from '@/app/_components/Button';
import CreateModelForm from '@/app/_components/CreateModelForm';
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
