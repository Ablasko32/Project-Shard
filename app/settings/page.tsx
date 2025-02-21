import React from 'react';
import { Metadata } from 'next';
import ConnectionTest from '@/app/_components/ConnectionTest';
import SettingsForm from '@/app/_components/SettingsForm';
import DeleteProfile from '@/app/_components/DeleteProfile';
import { getAllSettings } from '@/app/_lib/actions';

export const metadata: Metadata = {
	title: 'My Settings',
};

export default async function page() {
	const settings = await getAllSettings();

	return (
		<div className="pageContainer flex flex-col items-center gap-4">
			<h2 className="mb-2 self-start text-center text-xl font-bold lg:text-3xl">
				My Settings
			</h2>

			<ConnectionTest />

			<SettingsForm settings={settings} />

			<DeleteProfile />

			{/* docs */}
			<div className="mt-10 max-w-sm self-center rounded-md bg-lightSecondary px-2 py-1 text-center text-sm text-lightTextSecondary dark:bg-darkSecondary dark:text-darkTextSecondary">
				Visit official{' '}
				<a
					className="text-lightPrimary transition-all duration-150 hover:opacity-80 dark:text-darkPrimary"
					href="https://github.com/Ablasko32"
					target="_blank"
				>
					/Documentation.
				</a>
			</div>

			<p className="text-center text-xs font-light italic text-lightTextSecondary/60 dark:text-darkTextSecondary/60">
				&quot;Make AI Free again&quot;
			</p>
		</div>
	);
}
