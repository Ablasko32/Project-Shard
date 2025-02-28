import type { Metadata } from 'next';
import '@/app/globals.css';
import Navigation from '@/components/ui/Navigation';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/ui/Footer';
import { Toaster } from 'react-hot-toast';
import 'regenerator-runtime/runtime';
import ModelProvider from '@/contexts/ModelProvider';
import AiProviderProvider from '@/contexts/AiProviderProvider';

const inter = Inter({
	subsets: ['latin'],
});
export const metadata: Metadata = {
	title: {
		template: 'Shard | %s',
		default: 'Shard | Welcome to AI revolution',
	},
	description: 'Simple wrapper GUI for Ollama',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} h-dvh max-h-dvh overflow-hidden antialiased`}
			>
				{/* AI service provider defaults to ollama */}
				<AiProviderProvider>
					{/* Model provider provides model and setter function */}
					<ModelProvider>
						{/* Theme provider dark/light defaults to dark via class on body */}
						<ThemeProvider
							defaultTheme="dark"
							attribute="class"
							enableSystem={false}
						>
							<div className="">
								<div className="grid h-svh max-h-svh grid-cols-1 grid-rows-[1fr,2%] md:grid-cols-[10%,1fr]">
									<Navigation />
									<main className="flex max-h-full flex-col pt-6 md:pt-0">
										{children}
									</main>
									<Footer />
								</div>
							</div>
						</ThemeProvider>
					</ModelProvider>
				</AiProviderProvider>
				{/* React Hot Toast notifications */}
				<Toaster
					gutter={8}
					toastOptions={{
						duration: 3000,
						className: 'dark:bg-darkSecondary dark:text-darkText',
					}}
				/>
			</body>
		</html>
	);
}
