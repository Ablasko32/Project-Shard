import Markdown from 'react-markdown';
import { Message } from '../types/types';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
// import 'highlight.js/styles/stackoverflow-light.css';
import 'highlight.js/styles/github-dark.css';

function ChatMessage({ msg }: { msg: Message }) {
	const isUserMsg: boolean = msg.role === 'user' ? true : false;

	return (
		<>
			<p
				className={`${isUserMsg ? 'self-end' : ''} text-lightTextSecondary dark:text-darkTextSecondary capitalize`}
			>
				{msg.role === 'user' ? '' : 'AI'}
			</p>
			<Markdown
				className={`${
					isUserMsg ? 'userMessage' : ''
				} relative min-w-32 rounded-2xl p-4 leading-8`}
				rehypePlugins={[rehypeHighlight]}
				remarkPlugins={[remarkGfm]}
			>
				{msg.content}
			</Markdown>
			<p
				className={`text-lightTextSecondary dark:text-darkTextSecondary text-xs font-thin ${isUserMsg ? 'self-end' : ''}`}
			>
				{msg.createdAt?.toLocaleTimeString()}
			</p>
		</>
	);
}

export default ChatMessage;
