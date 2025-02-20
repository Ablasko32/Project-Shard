'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';
import { authClient } from '@/app/_lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import TinySpinner from '@/app/_components/TinySpinner';

// login box for choosing currently active profile
export default function ProfileLoginItem({
	username,
	addNew = false,
}: {
	username: string;
	addNew?: boolean;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleSignIn() {
		// handle sign in logic here
		setIsLoading(true);
		try {
			await authClient.signIn.email({
				email: username + '@email.com',
				password: 'password',
				fetchOptions: {
					onSuccess() {
						toast.success(`Welcome ${username}`);
						router.push('/chat');
						router.refresh();
					},
					onError(context) {
						toast.error(context?.error.message);
					},
				},
			});
		} catch (err) {
			console.error(err);
			toast.error('Error signin in');
		} finally {
			setIsLoading(false);
		}
	}

	if (addNew)
		return (
			// add new profile button
			<Link href="/profile/new">
				<motion.div
					whileHover={{ scale: 1.08 }}
					className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-lightPrimary bg-lightSecondary dark:border-darkPrimary dark:bg-darkSecondary"
				>
					<div className="flex h-12 w-12 items-center justify-center rounded-full text-3xl font-bold">
						<span className="text-lightPrimary dark:text-darkPrimary">
							<AiOutlinePlus />
						</span>
					</div>
					<h3 className="font-semibold capitalize">Add new</h3>
				</motion.div>
			</Link>
		);

	// login to profile button
	return (
		<motion.div
			onClick={handleSignIn}
			whileHover={{ scale: 1.08 }}
			className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-lightPrimary bg-lightSecondary dark:border-darkPrimary dark:bg-darkSecondary"
		>
			<div className="flex h-12 w-12 items-center justify-center rounded-full text-3xl font-bold">
				{isLoading ? (
					<TinySpinner />
				) : (
					<span className="lowercase text-lightPrimary dark:text-darkPrimary">
						{username.charAt(0)}
					</span>
				)}
			</div>
			<h3 className="max-w-full break-words font-semibold capitalize">
				{username}
			</h3>
		</motion.div>
	);
}
