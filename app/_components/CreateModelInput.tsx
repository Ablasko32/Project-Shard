import { GoQuestion } from 'react-icons/go';

interface CreateModelInput {
	name: string;
	description: string;
	id: string;
	placeholder: string;
	textArea?: boolean;
}

export default function CreateModelInput({
	name,
	description,
	id,
	placeholder,
	textArea = false,
}: CreateModelInput) {
	return (
		<div className="flex flex-col gap-1">
			<label className="flex gap-1 text-sm capitalize lg:text-lg" htmlFor={id}>
				<span className="w-0.5 rounded-full bg-lightPrimary"></span>
				<span> {name}</span>
			</label>
			<div className="flex items-center gap-1 rounded-md p-1 text-xs font-light text-lightTextSecondary dark:text-darkTextSecondary lg:text-sm">
				<div>
					<GoQuestion />
				</div>
				<p>{description}</p>
			</div>

			{textArea ? (
				<textarea
					className="w-full resize-none rounded-md bg-lightSecondary px-4 py-2 !ring-opacity-50 placeholder:font-light placeholder:capitalize focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent"
					id={id}
					placeholder={placeholder}
				/>
			) : (
				<input
					className="rounded-md bg-lightSecondary px-4 py-2 !ring-opacity-50 placeholder:font-light placeholder:capitalize focus:outline-none focus:ring focus:ring-lightAccent dark:bg-darkSecondary dark:focus:ring-darkAccent"
					id={id}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
}
