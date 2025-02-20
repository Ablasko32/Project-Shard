'use client';

import Button from '@/app/_components/Button';
import { authClient } from '@/app/_lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CiLogout } from 'react-icons/ci';

import { AiOutlineUser } from 'react-icons/ai';

// sign user out on click, rendered only if session exists
export default function SignOutButton() {
	const router = useRouter();

	const { data: session } = authClient.useSession();
	// console.log('SESSION IN SIGNOUT', session);

	async function handleLogout() {
		try {
			await authClient.signOut();
			router.push('/profile');
			router.refresh();
		} catch (error) {
			console.error('SIGN OUT ERROR', error);
			toast.error('Error signing out');
		}
	}

	// if not session it wont render
	if (!session) return null;

	return (
		<div className="mt-4 flex flex-col items-center gap-1">
			<Button type="secondary" onClick={handleLogout}>
				<CiLogout />
			</Button>
			<p className="flex items-center gap-1 text-center text-sm text-lightTextSecondary dark:text-darkTextSecondary">
				<AiOutlineUser />
				{session.user.name}
			</p>
		</div>
	);
}
