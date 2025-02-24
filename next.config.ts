import type { NextConfig } from 'next';

const OLLAMA_API =
	(process.env.OLLAMA_API as string) ?? 'http://localhost:11434';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true, // eslint-disable-line
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/proxy/:path*',
				destination: `${OLLAMA_API}/:path*`,
			},
		];
	},
	async headers() {
		return [
			{
				source: '/api/proxy/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'POST, GET, OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
				],
			},
		];
	},
	serverExternalPackages: ['pdf-parse'],
	experimental: {
		serverActions: {
			bodySizeLimit: '50mb',
		},
	},
};

export default nextConfig;
