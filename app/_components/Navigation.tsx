import Link from 'next/link';
import MobileNav from '@/app/_components/MobileNav';
import ThemeSwitch from '@/app/_components/ThemeSwitch';
import Logo from '@/app/_components/Logo';
import SocialIcons from '@/app/_components/SocialIcons';
import Button from '@/app/_components/Button';
import NavigationLink from '@/app/_components/NavigationLink';

function Navigation() {
	return (
		<>
			{/* big nav */}
			<div className="row-span-2 hidden h-full border-r border-r-lightAccent !border-opacity-10 p-8 dark:border-r-darkAccent md:flex md:flex-col md:items-center">
				<Link href="/" className="flex flex-col items-center gap-1">
					<Logo />
				</Link>
				<ul className="flex flex-1 flex-col items-center justify-center gap-6">
					<li>
						<Button className="text-sm">
							<Link href="/chat">New</Link>
						</Button>
					</li>

					<NavigationLink name="chats" path="/chat/all-chats" />

					<NavigationLink name="models" path="/models" />

					<NavigationLink name="prompts" path="/prompts" />

					<NavigationLink name="settings" path="/settings" />
					<ThemeSwitch />
				</ul>
				<SocialIcons />
			</div>
			{/* small nav */}
			<MobileNav />
		</>
	);
}

export default Navigation;
