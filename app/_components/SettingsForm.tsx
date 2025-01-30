'use client';

export default function SettingsForm() {
	return (
		<form className="mt-6 flex w-[90%] max-w-4xl flex-col gap-4">
			<div className="flex flex-col gap-1">
				<label className="text-sm" htmlFor="name">
					What will the model call you?
				</label>
				<input
					className="rounded-md bg-lightSecondary px-2 py-1 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					id="name"
					type="text"
					placeholder="Your name"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-sm" htmlFor="system">
					Default system message?
				</label>
				<textarea
					className="resize-none rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					id="system"
					rows={5}
					placeholder="You are a helpful assistant."
				/>
			</div>
		</form>
	);
}
