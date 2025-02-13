'use server';
import { Prompts, Settings } from '@/dbModels';
import { revalidatePath } from 'next/cache';
import { Prompts as IPrompts } from '@/app/_components/PromptsSearchAndDisplay';
import { Settings as ISettings } from '../_components/SettingsForm';

// revalidate a path
export async function revalidatePathAction(path: string) {
	revalidatePath(path);
}

//PROMPTS

// get all prompts
export async function getAllPrompts(): Promise<IPrompts[]> {
	try {
		const results = await Prompts.findAll();
		return results.map(res => res.toJSON());
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching prompts');
	}
}

// Aadd new prompt
export async function addNewPrompt(formData: FormData): Promise<void> {
	const prompt = formData.get('prompt');
	const title = formData.get('title');
	if (!prompt || !title) throw new Error('Invalid form data');
	try {
		await Prompts.create({
			title: title.slice(0, 200),
			content: prompt.slice(0, 1000),
		});
		revalidatePath('/prompts');
	} catch (err) {
		console.error(err);
		throw new Error('Error adding new prompt');
	}
}

// delete prompt
export async function deletePrompt(id: number): Promise<void> {
	try {
		await Prompts.destroy({ where: { id } });
		revalidatePath('/prompts');
	} catch (err) {
		console.error(err);
		throw new Error('Error deleting prompt');
	}
}

// SETTINGS

// get all settings
export async function getAllSettings(): Promise<ISettings> {
	try {
		const results = await Settings.findOne();

		return results?.toJSON();
	} catch (err) {
		console.error(err);
		throw new Error('Error fetching settings');
	}
}

// create or update settings
export async function updateSettings(formData: FormData): Promise<void> {
	const username = formData.get('username')?.slice(0, 100) as string;
	const system = formData.get('system')?.slice(0, 1000) as string;
	try {
		const settings = await Settings.findAll();
		if (!settings.length) {
			await Settings.create({ username, system });
		} else {
			await Settings.update(
				{ username: username, system: system },
				{ where: { id: 1 } }
			);
		}
		revalidatePath('/settings');
	} catch (err) {
		console.error(err);
		throw new Error('Error updating settings');
	}
}
