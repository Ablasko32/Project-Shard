'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { HiOutlineSparkles } from 'react-icons/hi';
import TinySpinner from '@/components/ui/TinySpinner';
import { User } from 'better-auth';

const MAX_PROFILE_NUMBER: number = 4;

export default function RegisterForm({ users }: { users: User[] }) {
	const [username, setUsername] = useState<string>('');
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	async function handleRegister(e: FormEvent) {
		e.preventDefault();
		if (!username) return;
		if (username.length > 8) {
			toast.error('Max username length is 8');
			return;
		}
		if (users.length >= MAX_PROFILE_NUMBER) {
			toast.error(`Max number of profiles is ${MAX_PROFILE_NUMBER}`);
			return;
		}

		startTransition(async () => {
			await authClient.signUp.email(
				{
					email: username + '@email.com',
					password: 'password',
					name: username,
				},
				{
					onSuccess() {
						toast.success('Profile created');
						router.push('/chat');
						router.refresh();
					},
					onError(context) {
						toast.error(context?.error?.message);
					},
				}
			);
		});
	}

	return (
		<form className="flex flex-col items-center gap-4">
			<input
				className="rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
				value={username}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setUsername(e.target.value);
				}}
				type="text"
				placeholder="Your nickname"
			/>
			{isPending ? (
				<TinySpinner />
			) : (
				<Button onClick={handleRegister}>
					<HiOutlineSparkles />
					Create
				</Button>
			)}
		</form>
	);
}
