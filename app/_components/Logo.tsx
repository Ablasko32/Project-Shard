'use client';

import Image from 'next/image';
import DarkLogo from '@/public/logo.svg';
import LightLogo from '@/public/logo-light.svg';
import { useTheme } from 'next-themes';

export default function Logo({ type = 'large' }: { type?: string }) {
	const { theme } = useTheme();

	return (
		<div className="flex flex-col items-center">
			<div className="relative aspect-square h-14">
				<Image
					fill
					src={theme === 'light' ? LightLogo : DarkLogo}
					alt="App logo"
				/>
			</div>
			{type !== 'small' && (
				<p className="flex gap-1 text-xs">
					<span>Project</span>
					<span className="text-lightPrimary dark:text-darkPrimary font-bold">
						Shard
					</span>
				</p>
			)}
		</div>
	);
}
