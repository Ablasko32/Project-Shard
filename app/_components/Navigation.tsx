import Link from 'next/link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';
import SocialIcons from './SocialIcons';

function Navigation() {
	return (
		<>
			{/* big nav */}
			<div className="hidden h-full p-8 md:flex md:flex-col md:items-center">
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
					<li className="mainNavItem">Settings</li>
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
