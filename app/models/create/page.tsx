import TinySpinner from '@/app/_components/TinySpinner';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My Models-Create',
};

function page() {
	return (
		<div>
			CREATE
			<div>
				<button>
					<TinySpinner /> CLICK
				</button>
			</div>
		</div>
	);
}

export default page;
