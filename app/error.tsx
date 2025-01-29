'use client';

import Link from 'next/link';
import { GoAlert } from 'react-icons/go';

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
				<div className="flex flex-row items-center gap-4 lg:gap-8">
					<button
						className="rounded-md bg-lightPrimary px-2 py-1 font-semibold text-lightBg dark:bg-darkPrimary dark:text-darkBg"
						onClick={reset}
					>
						Try again?
					</button>
					{/* <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary lg:hidden">
						or
					</p> */}
					<Link
						className="rounded-md border border-lightPrimary px-2 py-1 font-semibold dark:border-lightPrimary"
						href="/"
					>
						Go home?
					</Link>
				</div>
			</div>
		</div>
	);
}
