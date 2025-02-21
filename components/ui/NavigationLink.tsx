'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function NavigationLink({
	path,
	name,
}: {
	path: string;
	name: string;
}) {
	const pathname = usePathname();

	return (
		<li
			className={`mainNavItem ${pathname.startsWith(path) ? 'disabled: text-lightPrimary dark:text-darkPrimary' : ''}`}
		>
			<Link className="capitalize" href={path}>
				{name}
			</Link>
		</li>
	);
}
