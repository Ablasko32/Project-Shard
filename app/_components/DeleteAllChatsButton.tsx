'use client';
import { HiOutlineTrash } from 'react-icons/hi';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import { deleteAllChats } from '@/tools/chat-store';

export default function DeleteAllChatsButton() {
	async function handleDeleteAll() {
		if (!window.confirm('Are you sure?')) return;
		try {
			await deleteAllChats();
			toast.success('Chats deleted');
		} catch (err) {
			console.error(err);
			toast.error('Error deleting chats');
		}
	}

	return (
		<Button onClick={handleDeleteAll} className="lg:mr-20">
			{' '}
			<HiOutlineTrash />
			Clear
		</Button>
	);
}
