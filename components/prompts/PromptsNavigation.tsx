'use client';
import { MdOutlineEdit } from 'react-icons/md';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoMdList } from 'react-icons/io';

export default function PromptsNavigation() {
	const pathname = usePathname();

	return (
		<>
			<Link
				className="lg:mr-20"
				href={`${pathname === '/prompts' ? 'prompts/addNew' : '/prompts'}`}
			>
				<Button className="my-4 lg:my-0">
					{pathname === '/prompts' ? (
						<>
							<MdOutlineEdit />
							Add
						</>
					) : (
						<>
							<IoMdList />
							List
						</>
					)}
				</Button>
			</Link>
		</>
	);
}
