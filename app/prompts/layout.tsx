import PromptsNavigation from '@/app/_components/PromptsNavigation';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pageContainer flex h-full w-full flex-col gap-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold capitalize lg:text-3xl">My Prompts</h2>
				<PromptsNavigation />
			</div>
			<div className="h-32 w-full flex-grow overflow-y-scroll">{children}</div>
		</div>
	);
}

export default Layout;
