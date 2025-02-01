import React from 'react';
import { VscTriangleRight } from 'react-icons/vsc';

export default function ModelShowDetailComponent({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<div className="flex w-full flex-col pr-4">
			<div className="flex items-center gap-1 capitalize lg:text-lg">
				<span className="text-xl text-lightPrimary dark:text-darkPrimary">
					<VscTriangleRight />
				</span>
				<span className="font-semibold">{title}</span>
			</div>
			<div className="break-words pl-6 text-lightTextSecondary dark:text-darkTextSecondary">
				{children}
			</div>
		</div>
	);
}
