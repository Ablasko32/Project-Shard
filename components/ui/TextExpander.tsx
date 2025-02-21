'use client';

import { useState } from 'react';

interface TextExpander {
	body: string;
	maxLength?: number;
}

// collapsible text expander
export default function TextExpander({ body, maxLength = 100 }: TextExpander) {
	const [isExpanded, setExpanded] = useState<boolean>(false);

	if (body.length <= maxLength) return body;
	let text: string;
	if (isExpanded) {
		text = body;
	} else {
		text = body.slice(0, maxLength) + '...';
	}

	return (
		<div className="w-full max-w-full">
			<p>{text}</p>
			<button
				className="text-lightPrimary transition-all duration-150 hover:scale-105 dark:text-darkPrimary/50"
				onClick={() => setExpanded(!isExpanded)}
			>
				{isExpanded ? 'Show less' : 'Show more'}
			</button>
		</div>
	);
}
