import Markdown from 'react-markdown';
import { Message } from '../types/types';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

function ChatMessage({ msg }: { msg: Message }) {
	const isUserMsg: boolean = msg.role === 'user' ? true : false;

	return (
		<>
			{/* Message title if user none, if assistant AI */}
			<p
				className={`${isUserMsg ? 'self-end' : ''} capitalize text-lightTextSecondary dark:text-darkTextSecondary`}
			>
				{msg.role === 'user' ? '' : 'AI'}
			</p>
			{/* if assistant render markdown */}
			{msg.role === 'user' ? (
				<p className="userMessage relative min-w-32 rounded-2xl p-4 leading-8">
					{msg.content}
				</p>
			) : (
				<Markdown
					className={`relative min-w-32 rounded-2xl p-4 leading-8`}
					rehypePlugins={[rehypeHighlight]}
					remarkPlugins={[remarkGfm]}
				>
					{msg.content}
				</Markdown>
			)}

			<p
				className={`text-xs font-light text-lightTextSecondary opacity-90 dark:text-darkTextSecondary ${isUserMsg ? 'self-end' : ''}`}
			>
				{msg.createdAt?.toLocaleTimeString()}
			</p>
		</>
	);
}

export default ChatMessage;
