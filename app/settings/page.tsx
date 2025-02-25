import React from 'react';
import { Metadata } from 'next';
import ConnectionTest from '@/components/settings/ConnectionTest';
import SettingsForm from '@/components/settings/SettingsForm';
import DeleteProfile from '@/components/auth/DeleteProfile';
import { getAllSettings } from '@/lib/dbOperations';
import ChooseProviderSelect from '@/components/ui/ChooseProviderSelect';

export const metadata: Metadata = {
	title: 'My Settings',
};

export default async function page() {
	const settings = await getAllSettings();

	return (
		<div className="pageContainer flex flex-col">
			<h2 className="mb-2 self-start text-center text-xl font-bold lg:text-3xl">
				My Settings
			</h2>
			<div className="flex h-32 w-full flex-grow flex-col items-center gap-4 overflow-y-scroll">
				<ChooseProviderSelect />

				<ConnectionTest />

				<SettingsForm settings={settings} />

				<DeleteProfile />

				{/* docs */}
				<div className="mt-6 max-w-sm self-center rounded-md bg-lightSecondary px-2 py-1 text-center text-sm text-lightTextSecondary dark:bg-darkSecondary dark:text-darkTextSecondary">
					Visit official{' '}
					<a
						className="text-lightPrimary transition-all duration-150 hover:opacity-80 dark:text-darkPrimary"
						href="https://github.com/Ablasko32/Project-Shard"
						target="_blank"
					>
						/Documentation.
					</a>
				</div>

				<p className="text-center text-xs font-light italic text-lightTextSecondary/60 dark:text-darkTextSecondary/60">
					&quot;Make AI Free again&quot;
				</p>
			</div>
		</div>
	);
}
