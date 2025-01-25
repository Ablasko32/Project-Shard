import Link from 'next/link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';
import SocialIcons from './SocialIcons';

function Navigation() {
	return (
		<>
			{/* big nav */}
			<div className="row-span-2 hidden h-full border-r border-r-lightAccent !border-opacity-10 p-8 dark:border-r-darkAccent md:flex md:flex-col md:items-center">
				<Link href="/" className="flex flex-col items-center gap-1">
					<Logo />
				</Link>
				<ul className="flex flex-1 flex-col items-center justify-center gap-6">
					<li className="mainNavItem">
						<Link href="/">Chat</Link>
					</li>
					<li className="mainNavItem">
						<Link href="/models">Models</Link>
					</li>
					<li className="mainNavItem">
						<Link href="/settings">Settings</Link>
					</li>
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

// divide-lightAccent !divide-opacity-10 dark:divide-darkPrimary
