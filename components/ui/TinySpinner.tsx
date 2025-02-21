'use client';

import { easeOut, motion } from 'framer-motion';

export default function TinySpinner() {
	return (
		<motion.div
			animate={{ rotate: 360 }}
			transition={{ duration: 1, repeat: Infinity, ease: easeOut }}
			className="h-4 w-4 rounded-full border-2 border-lightSecondary/70 border-t-lightPrimary dark:border-lightSecondary/50 dark:border-t-darkPrimary"
		></motion.div>
	);
}
