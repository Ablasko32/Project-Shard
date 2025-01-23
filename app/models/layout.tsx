import ModelsNavigation from '@/app/_components/ModelsNavigation';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pageContainer">
			<div className="my-2 mb-6 flex items-center justify-between">
				<h2 className="text-xl font-semibold capitalize lg:text-2xl">
					My models
				</h2>
				<ModelsNavigation />
			</div>
			<div className="h-full">{children}</div>
		</div>
	);
}

export default layout;
