import CreateModelForm from '@/components/models/CreateModelForm';
import { Metadata } from 'next';
import { PiBrainLight } from 'react-icons/pi';

export const metadata: Metadata = {
	title: 'My Models-Create',
};

function page() {
	return (
		<div className="mb-2 flex w-full flex-col items-center justify-center gap-2 px-2">
			{/* title */}
			<div className="flex flex-col items-center justify-center gap-1">
				<h2 className="flex flex-col items-center gap-1 text-xl font-bold capitalize lg:text-2xl">
					<span className="text-2xl lg:text-3xl">
						<PiBrainLight />
					</span>
					Create Your Model
				</h2>
				<p className="mx-4 text-center text-xs text-lightTextSecondary dark:text-darkTextSecondary lg:text-sm">
					Choose a base model, configure it, and create your own personal
					helper!
				</p>
			</div>
			{/* create model from file or guided */}
			<CreateModelForm />
		</div>
	);
}

export default page;
