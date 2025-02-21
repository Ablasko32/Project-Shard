'use client';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdList } from 'react-icons/io';

export default function DocumentsNavigation() {
	const pathname = usePathname();

	return (
		<Link href={pathname === '/documents' ? '/documents/upload' : '/documents'}>
			<Button className="lg:mr-20">
				{pathname === '/documents' ? <MdOutlineEdit /> : <IoMdList />}
				{pathname === '/documents' ? 'Add' : 'list'}
			</Button>
		</Link>
	);
}
