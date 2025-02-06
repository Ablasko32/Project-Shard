'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ButtonInterface {
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent) => void;
	className?: string;
	type?: 'primary' | 'danger' | 'secondary';
}

export default function Button({
	children,
	onClick,
	className,
	type = 'primary',
}: ButtonInterface) {
	const styleTypes: { [key: string]: string } = {
		primary:
			'bg-lightPrimary text-lightBg dark:bg-darkPrimary dark:text-darkBg',
		danger: 'bg-lightError dark:bg-darkError text-lightBg dark:text-darkBg',
		secondary: 'bg-lightSecondary dark:bg-darkSecondary',
	};
	return (
		<motion.button
			onClick={onClick}
			whileHover={{
				scale: 0.95,
			}}
			whileTap={{
				scale: 0.9,
			}}
			transition={{ duration: 0.2 }}
			className={`flex items-center justify-center gap-1 self-center rounded-lg px-4 py-1 font-semibold uppercase ${styleTypes[type]} ${className ? className : ''}`}
		>
			{children}
		</motion.button>
	);
}
