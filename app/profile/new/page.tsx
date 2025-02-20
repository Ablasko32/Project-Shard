import Button from '@/app/_components/Button';
import RegisterForm from '@/app/_components/RegisterForm';
import { Metadata } from 'next';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';

export const metadata: Metadata = {
	title: 'Create New Profile',
};

export default function page() {
	return (
		<div className="pageContainer mx-auto flex max-w-3xl flex-col items-center justify-center gap-6">
			<Link className="place-self-start text-xs" href="/profile">
				<Button type="secondary">
					<IoMdArrowBack />
					back
				</Button>
			</Link>
			<h1 className="text-xl font-semibold lg:text-2xl">
				Create a new profile
			</h1>
			<RegisterForm />
		</div>
	);
}
