'use client';

import Button from '@/components/ui/Button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CiLogout } from 'react-icons/ci';
import { AiOutlineUser } from 'react-icons/ai';
import { useTransition } from 'react';
import TinySpinner from '@/components/ui/TinySpinner';

// sign user out on click, rendered only if session exists
export default function SignOutButton() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const { data: session } = authClient.useSession();

	async function handleLogout() {
		startTransition(async () => {
			try {
				await authClient.signOut();
				toast.success('Signed out');
				router.push('/profile');
				router.refresh();
			} catch (error) {
				console.error('SIGN OUT ERROR', error);
				toast.error('Error signing out');
			}
		});
	}

	// if not session it wont render
	if (!session) return null;

	return (
		<div className="mt-4 flex flex-col items-center gap-1">
			<Button type="secondary" onClick={handleLogout}>
				{isPending ? <TinySpinner /> : <CiLogout />}
			</Button>
			<p className="flex items-center gap-1 text-center text-sm text-lightTextSecondary dark:text-darkTextSecondary">
				<AiOutlineUser />
				{session.user.name}
			</p>
		</div>
	);
}
