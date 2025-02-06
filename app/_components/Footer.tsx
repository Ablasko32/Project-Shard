export default function Footer() {
	const year: number = new Date().getFullYear();

	return (
		<footer className="place-self-center border-none py-2 text-lightTextSecondary dark:text-darkTextSecondary md:col-start-2">
			<p className="text-xs opacity-60">
				&copy;{year} Project{' '}
				<span className="text-lightPrimary/90 dark:text-darkAccent/50">
					Shard
				</span>
			</p>
		</footer>
	);
}
