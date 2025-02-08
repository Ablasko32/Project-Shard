'use client';

import Button from '@/app/_components/Button';
import { deleteLocalState } from '@/app/_lib/store';
import toast from 'react-hot-toast';

export default function ClearLocalData() {
	function handleLocalStorageCleaning() {
		if (!window.confirm('Are you sure?')) return;
		deleteLocalState();
		toast.success('Local storage cleared');
	}

	return (
		<Button
			onClick={handleLocalStorageCleaning}
			type="secondary"
			className="text-xs"
		>
			Clear local data
		</Button>
	);
}
