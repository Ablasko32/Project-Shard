import React from 'react';
import DocumentsNavigation from '@/components/documents/DocumentsNavigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My documents',
};

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pageContainer flex flex-col gap-10">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold capitalize lg:text-3xl">
					My documents
				</h2>
				<DocumentsNavigation />
			</div>
			{children}
		</div>
	);
}
