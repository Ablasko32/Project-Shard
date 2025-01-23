import ChatLoader from '@/app/_components/ChatLoader';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My Models-Create',
};

function page() {
	return (
		<div>
			CREATE
			{/* <ChatLoader isVisible /> */}
		</div>
	);
}

export default page;
