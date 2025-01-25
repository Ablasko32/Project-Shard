'use server';
import { revalidatePath } from 'next/cache';
import ollama from 'ollama';

interface Response {
	sucess: boolean;
	msg: string;
}

// delete a model by name
export async function deleteModel(modelName: string): Promise<Response> {
	try {
		await ollama.delete({ model: modelName });
		revalidatePath('/models');
		return { sucess: true, msg: `Model ${modelName} deleted` };
	} catch (err) {
		console.error(err);
		return { sucess: false, msg: `Failed to delete model ${modelName}` };
	}
}

export async function pullModel(modelName: string) {
	try {
		await ollama.pull({ model: modelName });
		return true;
	} catch (err) {
		console.log(err);
	}
}

ollama.abort();
