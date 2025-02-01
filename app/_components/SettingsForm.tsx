'use client';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SettingsData, updateSettings } from '../settings/settingSlice';
import { RootState } from '../store';
import toast from 'react-hot-toast';

export default function SettingsForm() {
	const dispatch = useDispatch();
	const { username, defaultSystemMessage } = useSelector(
		(store: RootState) => store.settings
	);

	const { register, handleSubmit } = useForm<SettingsData>({
		defaultValues: { username, defaultSystemMessage },
	});

	function onSubmit(data: SettingsData) {
		if (!data.username && !data.defaultSystemMessage) return;
		try {
			dispatch(updateSettings(data));
			toast.success('Settings saved');
		} catch (err) {
			toast.error('Error updating settings');
		}
	}

	return (
		<form
			className="mt-6 flex w-full max-w-2xl flex-col gap-4"
			onBlur={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col gap-1">
				<label className="text-sm lg:text-lg" htmlFor="name">
					What will the model call you?
				</label>
				<input
					{...register('username')}
					className="rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					id="name"
					type="text"
					placeholder="Your name"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-sm lg:text-lg" htmlFor="system">
					Default system message?
				</label>
				<textarea
					{...register('defaultSystemMessage')}
					className="resize-none rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					id="system"
					rows={5}
					placeholder="You are a helpful assistant."
				/>
			</div>
		</form>
	);
}
