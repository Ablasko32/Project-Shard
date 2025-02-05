import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { GoAlert, GoQuestion } from 'react-icons/go';
import { CreateModel } from '@/app/_components/CreateModelForm';
import { VscTriangleRight } from 'react-icons/vsc';

interface CreateModelInput {
	name: string;
	description: string;
	id: keyof CreateModel;
	placeholder: string;
	textArea?: boolean;
	type?: string;
	register: UseFormRegister<CreateModel>;
	validation?: RegisterOptions<CreateModel>;
	errors?: string;
}

export default function CreateModelInput({
	name,
	description,
	id,
	placeholder,
	textArea = false,
	register,
	validation,
	errors,
	type = 'text',
}: CreateModelInput) {
	return (
		<div className="flex flex-col gap-1">
			<label
				className="flex items-center gap-1 text-sm capitalize lg:text-lg"
				htmlFor={id}
			>
				<span className="text-xl text-lightPrimary dark:text-darkPrimary">
					<VscTriangleRight />
				</span>
				<span className="font-semibold"> {name}</span>
			</label>
			<div className="flex items-center gap-1 rounded-md p-1 text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary lg:text-sm">
				<div>
					<GoQuestion />
				</div>
				<p>{description}</p>
			</div>

			{textArea ? (
				<textarea
					{...register(id, validation)}
					className="w-full resize-none rounded-md bg-lightSecondary px-4 py-2 !ring-opacity-50 placeholder:font-light placeholder:capitalize focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent"
					id={id}
					placeholder={placeholder}
				/>
			) : (
				<input
					{...register(id, validation)}
					className="rounded-md bg-lightSecondary px-4 py-2 !ring-opacity-50 placeholder:font-light placeholder:capitalize focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent"
					id={id}
					type={type}
					step={type ? '0.01' : undefined}
					placeholder={placeholder}
				/>
			)}
			{errors && (
				<div className="mt-0.5 flex items-center justify-center gap-1 text-center text-xs font-light text-lightError dark:text-darkError lg:font-normal">
					<GoAlert />
					<p>{errors}</p>
				</div>
			)}
		</div>
	);
}
