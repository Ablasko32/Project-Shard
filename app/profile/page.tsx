import ProfileLoginItem from '@/app/_components/ProfileLoginItem';
import db from '@/db';
import { user } from '@/db/schema';

export default async function page() {
	const users = await db.select().from(user);

	return (
		<div className="pageContainer flex flex-col items-center justify-center gap-8">
			<h1 className="text-xl font-semibold lg:text-2xl">
				Who is using{' '}
				<span className="text-lightPrimary dark:text-darkPrimary">
					Project Shard?
				</span>
			</h1>
			<div className="flex flex-wrap items-center justify-center gap-4">
				{users.map(user => {
					return <ProfileLoginItem username={user.name} key={user.id} />;
				})}
				<ProfileLoginItem username="admin" addNew />
			</div>
		</div>
	);
}
