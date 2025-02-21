'use client';

import Link from 'next/link';
import { GoAlert } from 'react-icons/go';
import Button from '@/components/ui/Button';

export default function error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className="flex h-full items-center justify-center">
			<div className="flex w-[80%] max-w-2xl flex-col items-center gap-1 rounded-md border border-lightError/50 p-4 dark:border-darkError/50 lg:w-1/3">
				<h2 className="flex items-center gap-2 text-2xl font-semibold text-lightError dark:text-darkError lg:text-3xl">
					<GoAlert />
					Error
				</h2>
				<p className="text-center text-darkTextSecondary">
					A following error has occured!
				</p>

				<p className="my-6 max-h-32 overflow-y-scroll text-center">
					{error.message}
				</p>
				<div className="flex flex-row items-center gap-4 lg:gap-6">
					<Button className="text-sm" onClick={reset}>
						Try again
					</Button>

					<Link href="/">
						<Button className="text-sm" type="secondary">
							Go home
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
