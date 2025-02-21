'use client';

import { motion } from 'framer-motion';

// bouncing dots for conversation
function ChatLoader({ isVisible }: { isVisible: boolean }) {
	if (isVisible) {
		return (
			<div className="absolute top-12 flex gap-2">
				{[0, 1, 2].map(dot => {
					return (
						<motion.span
							key={dot}
							animate={{ y: [0, -3, 0], opacity: [1, 0.8, 1] }}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: dot * 0.2,
								ease: 'easeInOut',
							}}
							className="z-50 h-2 w-2 rounded-full bg-lightPrimary shadow-sm shadow-lightAccent dark:bg-darkPrimary dark:shadow-darkAccent"
						></motion.span>
					);
				})}
			</div>
		);
	} else {
		return null;
	}
}

export default ChatLoader;
