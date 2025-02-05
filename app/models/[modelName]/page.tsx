import Button from '@/app/_components/Button';
import ModelShowDetailComponent from '@/app/_components/ModelShowDetailComponent';
import TextExpander from '@/app/_components/TextExpander';
import { getOllamaModelInfo } from '@/app/_lib/ollamaApi';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';
import { PiBrainLight } from 'react-icons/pi';

// Model details page
export default async function page({
	params,
}: {
	params: { modelName: string };
}) {
	const awaitedParams = await params;
	const modelName: string = awaitedParams.modelName.replace('%3A', ':');

	const responseData = await getOllamaModelInfo(modelName);
	// console.log(responseData);

	return (
		<div className="mx-auto flex max-w-2xl flex-col gap-6 lg:max-w-6xl">
			{/* back button */}
			<Link href="/models">
				<Button type="secondary" className="text-sm">
					<IoMdArrowBack />
					<span>Back</span>
				</Button>
			</Link>

			{/* title name of model */}
			<div className="mb-4 flex flex-col items-center text-2xl font-semibold lg:text-4xl">
				<PiBrainLight className="text-3xl lg:text-4xl" />
				<span>{modelName}</span>
			</div>

			{/* details */}
			<div className="mx-auto flex w-full flex-col items-center gap-4">
				{/* modified */}
				<ModelShowDetailComponent title="Modified">
					{new Date(responseData.modified_at).toLocaleDateString()}
				</ModelShowDetailComponent>

				{/* context lenght */}
				{responseData.model_info['llama.context_length'] && (
					<ModelShowDetailComponent title="Context lenght">
						{responseData.model_info['llama.context_length']}
					</ModelShowDetailComponent>
				)}

				{/* quantization */}
				{responseData.details.quantization_level && (
					<ModelShowDetailComponent title="Quantization Level">
						{responseData.details.quantization_level}
					</ModelShowDetailComponent>
				)}

				{/* system message */}
				{responseData.system && (
					<ModelShowDetailComponent title="System Message">
						{responseData.system}
					</ModelShowDetailComponent>
				)}

				{/* parameters */}
				{responseData.parameters && (
					<ModelShowDetailComponent title="Parameters">
						{responseData.parameters}
					</ModelShowDetailComponent>
				)}

				{/* template */}
				{responseData.template && (
					<ModelShowDetailComponent title="Template">
						<TextExpander body={responseData.template} />
					</ModelShowDetailComponent>
				)}

				{/* Model file */}
				{responseData.modelfile && (
					<ModelShowDetailComponent title="Model file">
						<TextExpander body={responseData.modelfile} />
					</ModelShowDetailComponent>
				)}
			</div>
		</div>
	);
}
