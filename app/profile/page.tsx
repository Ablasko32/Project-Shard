import ProfileLoginItem from '@/app/_components/ProfileLoginItem';

export default function page() {
	return (
		<div className="pageContainer flex flex-col items-center justify-center gap-8">
			<h1 className="text-xl font-semibold lg:text-2xl">
				Who is using{' '}
				<span className="text-lightPrimary dark:text-darkPrimary">
					Project Shard?
				</span>
			</h1>
			<div className="flex flex-wrap items-center justify-center gap-4">
				<ProfileLoginItem username="admin" />
				<ProfileLoginItem username="admin" />
				<ProfileLoginItem username="admin" />
				<ProfileLoginItem username="admin" />
				<ProfileLoginItem username="admin" addNew />
			</div>
		</div>
	);
}
