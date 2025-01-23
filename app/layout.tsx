import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/app/_components/Navigation';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Footer from '@/app/_components/Footer';

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
				className={`${inter.className} h-[100dvh] max-h-[100dvh] overflow-auto overscroll-none antialiased`}
			>
				{/* Theme provider dark/light defaults to dark via class on body */}
				<ThemeProvider
					defaultTheme="dark"
					attribute="class"
					enableSystem={false}
				>
					<div className="divide-lightAccent dark:divide-darkPrimary grid h-[100dvh] max-h-[100dvh] grid-cols-1 grid-rows-[1fr,3%] !divide-opacity-10 md:grid-cols-[10%,1fr] md:divide-x-2">
						<Navigation />
						<main className="flex flex-col pt-6 md:pt-0">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
