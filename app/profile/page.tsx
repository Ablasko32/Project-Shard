import ProfileLoginItem from '@/components/auth/ProfileLoginItem';
import db from '@/db';
import { user } from '@/db/schema';
import { User } from 'better-auth';

export default async function page() {
	let users: User[];
	try {
		users = await db.select().from(user);
	} catch (err) {
		console.log('Database_error', err);
		if (err.errno === -4078)
			throw new Error('Database_Error: Check database connection!');
		throw new Error('Error fetching profiles');
	}

	return (
		<div className="pageContainer flex flex-col items-center justify-center gap-8">
			<h1 className="text-xl font-semibold lg:text-2xl">
				Who is using{' '}
				<span className="text-lightPrimary dark:text-darkPrimary">
					Project Shard?
				</span>
			</h1>
			<div className="flex flex-wrap items-center justify-center gap-6">
				{users.map(user => {
					return <ProfileLoginItem username={user.name} key={user.id} />;
				})}
				<ProfileLoginItem username="admin" addNew />
			</div>
			<p className="text-center text-xs font-light italic text-lightTextSecondary/60 dark:text-darkTextSecondary/60">
				&quot;Make AI Free again&quot;
			</p>
		</div>
	);
}
