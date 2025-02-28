'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import Logo from '@/components/ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import SocialIcons from '@/components/ui/SocialIcons';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import NavigationLink from '@/components/ui/NavigationLink';
import SignOutButton from '../auth/SignOutButton';
import { authClient } from '@/lib/auth-client';
import { useAIProvider } from '@/contexts/AiProviderProvider';

/**
 * Mobile navigation with collapsibile sidebar
 * @returns JSX.element
 */
function MobileNav() {
	const [isNavOpen, setNavOpen] = useState<boolean>();
	const { provider } = useAIProvider();

	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const pathname = usePathname();

	const { data: session } = authClient.useSession();

	// close the menu when navigation occurs/ when pathname changes
	useEffect(() => {
		setNavOpen(false);
	}, [pathname]);

	// close the menu when clicked outside
	useEffect(() => {
		if (!isNavOpen) return;
		if (!menuRef.current || !containerRef.current) return;

		function closeModal(e: MouseEvent): void {
			if (e.target === containerRef.current && e.target !== menuRef.current) {
				setNavOpen(false);
			}
		}

		document.addEventListener('click', closeModal);

		return () => document.removeEventListener('click', closeModal);
	}, [menuRef, containerRef, isNavOpen]);

	return (
		<>
			<div
				onClick={() => setNavOpen(true)}
				className="absolute left-2 top-2 cursor-pointer md:hidden"
			>
				<Logo type="small" />
			</div>
			{/* dropdown */}
			<AnimatePresence>
				{isNavOpen && (
					// blurred container
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
						ref={containerRef}
						className="fixed left-0 top-0 z-40 w-full bg-white/5 backdrop-blur-sm"
					>
						<motion.div
							initial={{ x: -100 }}
							animate={{ x: 0 }}
							exit={{ x: -200 }}
							transition={{ duration: 0.2, type: 'tween' }}
							ref={menuRef}
							className="flex h-screen w-1/2 flex-col items-center justify-center border-r border-r-lightAccent !border-opacity-20 bg-lightSecondary p-4 dark:border-r-darkAccent dark:bg-darkSecondary md:hidden"
						>
							<div
								onClick={() => setNavOpen(false)}
								className="mb-auto flex flex-col items-center"
							>
								<Logo />
							</div>
							<ul className="mb-auto flex flex-col items-center gap-4">
								{session && (
									<>
										{' '}
										<li>
											<Button className="text-sm">
												<Link href="/chat">New</Link>
											</Button>
										</li>
										<NavigationLink name="chats" path="/chat/all-chats" />
										{provider === 'ollama' && (
											<NavigationLink name="models" path="/models" />
										)}
										{provider === 'openRouter' && (
											<NavigationLink
												name="models"
												path="/models-open-router"
											/>
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
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default MobileNav;
