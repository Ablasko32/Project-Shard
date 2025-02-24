import { createOllama, OllamaProvider } from 'ollama-ai-provider';

const OLLAMA_API =
	(process.env.OLLAMA_API as string) ?? 'http://localhost:11434';

// ollama client
export const ollama: OllamaProvider = createOllama({
	baseURL: `${OLLAMA_API}/api`,
});
