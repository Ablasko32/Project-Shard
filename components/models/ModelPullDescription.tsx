export default function ModelPullDescription() {
	return (
		<div className="flex flex-col gap-4 text-center text-lightTextSecondary dark:text-darkTextSecondary">
			<p className="">
				Select a model from{' '}
				<a
					className="text-lightPrimary underline transition-all duration-150 hover:opacity-80 dark:text-darkPrimary/70"
					href="https://ollama.com/search"
					target="_blank"
				>
					Ollama
				</a>{' '}
				and pull it to your local machine.
			</p>
			<p className="mx-6 rounded-md bg-lightSecondary px-4 py-2 text-xs dark:bg-darkSecondary">
				Pay atention to model size and your machine hardware, expecially VRAM!
			</p>
		</div>
	);
}
