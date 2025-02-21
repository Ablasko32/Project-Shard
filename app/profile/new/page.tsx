import Button from '@/components/ui/Button';
import RegisterForm from '@/components/auth/RegisterForm';
import db from '@/db';
import { user } from '@/db/schema';
import { Metadata } from 'next';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';

export const metadata: Metadata = {
	title: 'Create New Profile',
};

export default async function page() {
	const users = await db.select().from(user);

	return (
		<div className="pageContainer mx-auto flex max-w-3xl flex-col items-center justify-center gap-6">
			<Link className="place-self-start text-xs" href="/profile">
				<Button type="secondary">
					<IoMdArrowBack />
					back
				</Button>
			</Link>
			<h1 className="text-xl font-semibold lg:text-2xl">
				Create a{' '}
				<span className="text-lightPrimary dark:text-darkPrimary">New</span>{' '}
				Profile
			</h1>
			<RegisterForm users={users} />
		</div>
	);
}
