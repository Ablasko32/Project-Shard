import PullModel from '@/components/models/PullModel';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My Models-Pull',
};
function Page() {
	return <PullModel />;
}

export default Page;
