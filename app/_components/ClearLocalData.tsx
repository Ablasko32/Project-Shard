'use client';

import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';

export default function ClearLocalData() {
	function handleLocalStorageCleaning() {
		if (!window.confirm('Are you sure?')) return;
		// LOGIC TO CLEAR WILL BE ADDED
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
