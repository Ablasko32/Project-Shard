'use client';

import toast from 'react-hot-toast';
import { MdContentCopy } from 'react-icons/md';
import { motion } from 'framer-motion';
import copy from 'copy-to-clipboard';

export default function CopyButton({ content }: { content: string }) {
	// Copy content to clipboard and display a toast
	function handleCopy() {
		// using library to avoid http problems
		copy(content);
		toast.success('Content copied');
	}

	return (
		<motion.button
			className="text-lightTextSecondary dark:text-darkTextSecondary"
			whileHover={{ opacity: 0.7 }}
			onClick={handleCopy}
		>
			<MdContentCopy />
		</motion.button>
	);
}
