'use client';

import { useTheme } from 'next-themes';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	// console.log(theme);

	function handleThemeSwitch(): void {
		setTheme(prev => {
			return prev === 'dark' ? 'light' : 'dark';
		});
	}

	return (
		<li className="mt-6 self-center">
			<button
				className="mainNavItem flex items-center gap-2"
				onClick={handleThemeSwitch}
			>
				<span className="text-xl">
					{theme === 'light' ? <HiOutlineSun /> : <HiOutlineMoon />}{' '}
				</span>
			</button>
		</li>
	);
}

export default ThemeSwitch;
