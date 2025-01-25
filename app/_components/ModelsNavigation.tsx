'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// hover:text-lightPrimary dark:hover:text-darkPrimary
const mainNavClass: string =
	' w-1/3 cursor-pointer px-3 py-1 transition-all duration-200 text-center   ';

// const activeNavClas: string =
// 	'text-lightPrimary dark:text-darkPrimary disabled cursor-not-allowed';

const activeNavClas: string =
	'bg-lightPrimary dark:bg-darkPrimary dark:text-darkBg text-lightBg';

export default function ModelsNavigation() {
	const pathname = usePathname();

	return (
		<div className="flex !w-[60%] max-w-52 items-center divide-x divide-lightPrimary !divide-opacity-30 overflow-hidden rounded-md border border-lightPrimary text-sm font-semibold dark:divide-darkPrimary dark:border-darkPrimary">
			<Link
				href="/models"
				className={`${mainNavClass} ${pathname === '/models' ? activeNavClas : ''}`}
			>
				List
			</Link>
			<Link
				href="/models/pull"
				className={`${mainNavClass}${pathname === '/models/pull' ? activeNavClas : ''}`}
			>
				Pull
			</Link>
			<Link
				href="/models/create"
				className={`${mainNavClass} ${pathname === '/models/create' ? activeNavClas : ''}`}
			>
				Create
			</Link>
		</div>
	);
}
