'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const [isMounted, setMounted] = useState<boolean>();

	function handleThemeSwitch(): void {
		setTheme(prev => {
			return prev === 'dark' ? 'light' : 'dark';
		});
		toast.success('Theme switched');
	}

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<li className="mt-6 self-center">
			{isMounted && (
				<button
					className="mainNavItem flex items-center gap-2"
					onClick={handleThemeSwitch}
				>
					<div className="text-xl">
						{theme === 'light' ? <HiOutlineSun /> : <HiOutlineMoon />}
					</div>
				</button>
			)}
		</li>
	);
}

export default ThemeSwitch;
