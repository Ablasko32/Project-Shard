import ModelsNavigation from '@/app/_components/ModelsNavigation';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pageContainer flex h-full max-h-full flex-col">
			<div className="my-2 mb-6 flex items-center justify-between">
				<h2 className="text-xl font-bold capitalize lg:text-3xl">My models</h2>
				<ModelsNavigation />
			</div>
			<div className="mx-auto h-96 max-w-[200rem] flex-grow overflow-y-scroll pt-2 lg:w-[80%]">
				{children}
			</div>
		</div>
	);
}

export default Layout;
