import type { Config } from 'tailwindcss';

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: '#0D1117',
				// dark
				darkBg: '#0D1117',
				darkSecondary: '#161b22',
				darkPrimary: '#00ff88',
				darkAccent: '#2af598',
				darkText: '#e6e6e6',
				darkTextSecondary: '#8b949e',
				darkError: '#F87171',

				// light

				lightBg: '#f9fafb',
				lightSecondary: '#e5e7eb',
				lightPrimary: '#00a676',
				lightAccent: '#2fd088',
				lightText: '#1e293b',
				lightTextSecondary: '#6b7280',
				lightError: '#DC2626',
			},
		},
	},
	darkMode: 'class',
	plugins: [],
} satisfies Config;
