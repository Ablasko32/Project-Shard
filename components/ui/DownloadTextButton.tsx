'use client';

import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';

interface DownloadText {
	content: string;
}

// download AI message as text file
export default function DownloadTextButton({ content }: DownloadText) {
	// download content as txt
	function handleDownloadAsTxt() {
		if (!content) return;
		const blob = new Blob([content], { type: 'text/plain' });
		const blobUrl = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = blobUrl;
		a.download = `shard-message-${new Date().toLocaleString()}.txt`;
		a.click();
		toast.success('Saved as .txt');

		// cleanup
		a.remove();
		URL.revokeObjectURL(blobUrl);
	}

	return (
		<motion.button
			whileHover={{ opacity: 0.7 }}
			onClick={handleDownloadAsTxt}
			className="text-lightTextSecondary dark:text-darkTextSecondary"
		>
			<FiDownload />
		</motion.button>
	);
}
