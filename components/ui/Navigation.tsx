'use client';

import Link from 'next/link';
import MobileNav from '@/components/ui/MobileNav';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import Logo from '@/components/ui/Logo';
import SocialIcons from '@/components/ui/SocialIcons';
import Button from '@/components/ui/Button';
import NavigationLink from '@/components/ui/NavigationLink';

import SignOutButton from '@/components/auth/SignOutButton';

import { authClient } from '@/lib/auth-client';
import { useAIProvider } from '@/contexts/AiProviderProvider';

function Navigation() {
	const { data: session } = authClient.useSession();
	const { provider } = useAIProvider();

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
							<li>
								<Button className="text-sm">
									<Link href="/chat">New</Link>
								</Button>
							</li>
							<NavigationLink name="chats" path="/chat/all-chats" />
							{/* render model if its ollama only */}
							{provider === 'ollama' && (
								<NavigationLink name="models" path="/models" />
							)}
							{provider === 'openRouter' && (
								<NavigationLink name="models" path="/models-open-router" />
							)}

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
