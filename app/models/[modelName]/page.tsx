import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';
import { PiBrainLight } from 'react-icons/pi';

// Model details page
export default async function page({
	params,
}: {
	params: { modelName: string };
}) {
	const modelName: string = params.modelName.replace('%3A', ':');

	let responseData;
	try {
		const response = await fetch('http://localhost:3000/api/proxy/api/show', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model: modelName,
				verbose: true,
			}),
		});
		if (!response.ok) {
			throw new Error('Error to fetch model details');
		}
		const data = await response.json();
		console.log(data);
		responseData = data;
	} catch (err) {
		console.log(err);
		throw new Error('Error fetching model details');
	}

	return (
		<div className="flex flex-col gap-6">
			<Link className="text-2xl lg:text-3xl" href="/models">
				<IoMdArrowBack />
			</Link>

			<div className="mb-4 flex flex-col items-center text-xl font-semibold lg:text-3xl">
				<PiBrainLight className="text-2xl lg:text-4xl" />{' '}
				<span>{modelName}</span>
			</div>

			{/* details */}
			<div className="mx-auto flex max-w-full flex-col items-center gap-4">
				<div className="flex w-full flex-col pr-4">
					<p className="flex gap-1 capitalize lg:text-lg">
						<span className="w-0.5 rounded-full bg-lightPrimary"></span>
						<span>Modified:</span>
					</p>
					<p className="text-lightTextSecondary dark:text-darkTextSecondary">
						{new Date(responseData.modified_at).toLocaleDateString()}
					</p>
				</div>
				<div className="flex w-full flex-col pr-4">
					<p className="flex gap-1 capitalize lg:text-lg">
						<span className="w-0.5 rounded-full bg-lightPrimary"></span>
						<span>Context length:</span>
					</p>
					<p className="text-lightTextSecondary dark:text-darkTextSecondary">
						{responseData.model_info['llama.context_length']}
					</p>
				</div>
				<div className="flex w-full flex-col pr-4">
					<p className="flex gap-1 capitalize lg:text-lg">
						<span className="w-0.5 rounded-full bg-lightPrimary"></span>
						<span>Quantization level:</span>
					</p>
					<p className="text-lightTextSecondary dark:text-darkTextSecondary">
						{responseData.details.quantization_level}
					</p>
				</div>
				<div className="flex w-full flex-col pr-4">
					<p className="flex gap-1 capitalize lg:text-lg">
						<span className="w-0.5 rounded-full bg-lightPrimary"></span>
						<span>System message:</span>
					</p>

					<p className="text-lightTextSecondary dark:text-darkTextSecondary">
						{responseData.system}
					</p>
				</div>
				<div className="flex w-full flex-col pr-4">
					<p className="flex gap-1 capitalize lg:text-lg">
						<span className="w-0.5 rounded-full bg-lightPrimary"></span>
						<span>Parameteres:</span>
					</p>
					<p className="text-lightTextSecondary dark:text-darkTextSecondary">
						{responseData.parameters}
					</p>{' '}
				</div>
				<div className="flex w-full flex-col pr-4">
					<p className="flex gap-1 capitalize lg:text-lg">
						<span className="w-0.5 rounded-full bg-lightPrimary"></span>
						<span>Template:</span>
					</p>
					<p className="leading-relaxed text-lightTextSecondary dark:text-darkTextSecondary">
						{responseData.template}
					</p>
				</div>
				<div className="flex w-full flex-col pr-4">
					<p className="flex gap-1 capitalize lg:text-lg">
						<span className="w-0.5 rounded-full bg-lightPrimary"></span>
						<span>Model file:</span>
					</p>
					<p className="break-words leading-relaxed text-lightTextSecondary dark:text-darkTextSecondary">
						{responseData.modelfile}
					</p>
				</div>
			</div>
		</div>
	);
}
