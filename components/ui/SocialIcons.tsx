import { FaGithub } from 'react-icons/fa';
import { SiOllama } from 'react-icons/si';
import { TbArrowsSplit2 } from 'react-icons/tb';

export default function SocialIcons() {
	return (
		<div className="flex gap-4 text-xl text-lightTextSecondary dark:text-darkAccent/30">
			<a
				target="_blank"
				className="mb-20 transition-all duration-150 hover:opacity-80 lg:mb-0"
				href="https://github.com/Ablasko32/Project-Shard"
			>
				<FaGithub />
			</a>
			<a
				target="_blank"
				className="transition-all duration-150 hover:opacity-80"
				href="https://ollama.com/"
			>
				<SiOllama />
			</a>
			<a
				target="_blank"
				className="transition-all duration-150 hover:opacity-80"
				href="https://openrouter.ai/"
			>
				<TbArrowsSplit2 />
			</a>
		</div>
	);
}
