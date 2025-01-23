'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ThemeSwitch from '@/app/_components/ThemeSwitch';
import Logo from './Logo';
import { motion } from 'framer-motion';
import SocialIcons from './SocialIcons';

/**
 * Mobile navigation with collapsibile sidebar
 * @returns JSX.element
 */
function MobileNav() {
	const [isNavOpen, setNavOpen] = useState<boolean>();

	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

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

			{isNavOpen && (
				// blurred container
				<div
					ref={containerRef}
					className="fixed left-0 top-0 z-40 w-full bg-white/5 backdrop-blur-sm"
				>
					<motion.div
						initial={{ x: -100 }}
						animate={{ x: 0 }}
						ref={menuRef}
						className="dark:bg-darkSecondary bg-lightSecondary border-r-lightAccent dark:border-r-darkAccent flex h-screen w-1/2 flex-col items-center justify-center border-r !border-opacity-20 p-4 md:hidden"
					>
						<div
							onClick={() => setNavOpen(false)}
							className="mb-auto flex flex-col items-center"
						>
							<Logo />
						</div>
						<ul className="mb-auto flex flex-col gap-4">
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
					</motion.div>
				</div>
			)}
		</>
	);
}

export default MobileNav;
