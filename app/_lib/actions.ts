'use server';
import { Prompts } from '@/dbModels';
import { revalidatePath } from 'next/cache';
import { Prompts as IPrompts } from '@/app/_components/PromptsSearchAndDisplay';

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
		throw new Error('Error deleting prompt');
	}
}
