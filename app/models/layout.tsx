import ModelsNavigation from '@/components/models/ModelsNavigation';
import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pageContainer flex h-full max-h-full flex-col">
			<div className="my-2 mb-6 flex items-center justify-between">
				<h2 className="text-xl font-bold capitalize lg:text-3xl">My models</h2>
				<ModelsNavigation />
			</div>
			{/* Suspense boundary */}
			<Suspense fallback={<Spinner />}>
				<div className="h-96 w-full flex-grow overflow-y-scroll pt-2">
					<div className="mx-auto max-w-6xl">{children}</div>
				</div>
			</Suspense>
		</div>
	);
}

export default Layout;
