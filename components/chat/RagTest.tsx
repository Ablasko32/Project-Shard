'use client';
import { ragTest } from "@/lib/actions' ;

export default function RagTest() {
	async function handleTest() {
		await ragTest();
	}

	return (
		<button
			className="max-w-xs place-self-center rounded-md bg-lightPrimary px-2 py-1 text-lightBg dark:bg-darkPrimary dark:text-darkBg"
			onClick={handleTest}
		>
			RagTest
		</button>
	);
}
