import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/app/_components/Navigation';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Footer from '@/app/_components/Footer';
import ReduxProvider from './_components/ReactRedux';

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
				<ReduxProvider>
					{/* Theme provider dark/light defaults to dark via class on body */}
					<ThemeProvider
						defaultTheme="dark"
						attribute="class"
						enableSystem={false}
					>
						<div className="">
							<div className="grid h-svh max-h-svh grid-cols-1 grid-rows-[1fr,3%] md:grid-cols-[10%,1fr]">
								<Navigation />
								<main className="flex max-h-full flex-col pt-6 md:pt-0">
									{children}
								</main>
								<Footer />
							</div>
						</div>
					</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
