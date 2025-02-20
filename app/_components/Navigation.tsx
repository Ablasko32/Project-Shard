import Link from 'next/link';
import MobileNav from '@/app/_components/MobileNav';
import ThemeSwitch from '@/app/_components/ThemeSwitch';
import Logo from '@/app/_components/Logo';
import SocialIcons from '@/app/_components/SocialIcons';
import Button from '@/app/_components/Button';
import NavigationLink from '@/app/_components/NavigationLink';
import { auth } from '@/auth';
import SignOutButton from '@/app/_components/SignOutButton';
import { headers } from 'next/headers';

async function Navigation() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<>
			{/* big nav */}
			<div className="row-span-2 hidden h-full border-r border-r-lightAccent !border-opacity-10 p-8 dark:border-r-darkAccent md:flex md:flex-col md:items-center">
				<Link href="/" className="flex flex-col items-center gap-1">
					<Logo />
				</Link>
				<ul className="flex flex-1 flex-col items-center justify-center gap-6">
					{session && (
						<>
							{' '}
							<li>
								<Button className="text-sm">
									<Link href="/chat">New</Link>
								</Button>
							</li>
							<NavigationLink name="chats" path="/chat/all-chats" />
							<NavigationLink name="models" path="/models" />
							<NavigationLink name="prompts" path="/prompts" />
							<NavigationLink name="documents" path="/documents" />
							<NavigationLink name="settings" path="/settings" />
						</>
					)}

					<ThemeSwitch />

					<SignOutButton />
				</ul>
				<SocialIcons />
			</div>
			{/* small nav */}
			<MobileNav />
		</>
	);
}

export default Navigation;
