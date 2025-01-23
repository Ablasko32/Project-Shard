import { FaGithub } from 'react-icons/fa';
import { SiOllama } from 'react-icons/si';

export default function SocialIcons() {
	return (
		<div className="text-lightTextSecondary dark:text-darkAccent/30 flex gap-4 text-xl">
			<a
				target="_blank"
				className="mb-20 transition-all duration-150 hover:opacity-80 lg:mb-0"
				href="https://github.com/Ablasko32?tab=repositories"
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
		</div>
	);
}
