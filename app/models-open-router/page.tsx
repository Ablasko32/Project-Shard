import FetchOpenRouterModels from '@/components/models/FetchOpenRouterModels';
import Spinner from '@/components/ui/Spinner';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Open Router Models',
};

export default async function page() {
	return (
		<div className="pageContainer flex h-full w-full flex-col items-center justify-center gap-4">
			<h2 className="mb-2 self-start text-center text-xl font-bold lg:text-3xl">
				My Open Router Models
			</h2>
			<Suspense fallback={<Spinner />}>
				<FetchOpenRouterModels />
			</Suspense>
		</div>
	);
}
