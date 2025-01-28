import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/proxy/:path*',
	// 			destination: 'http://localhost:11434/:path*',
	// 		},
	// 	];
	// },
	// async headers() {
	// 	return [
	// 		{
	// 			source: '/api/proxy/:path*',
	// 			headers: [
	// 				{ key: 'Access-Control-Allow-Origin', value: '*' },
	// 				{ key: 'Access-Control-Allow-Methods', value: 'POST, GET, OPTIONS' },
	// 				{ key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
	// 			],
	// 		},
	// 	];
	// },
};

export default nextConfig;
