'use server';
import { revalidatePath } from 'next/cache';

// revalidate a path
export async function revalidatePathAction(path: string) {
	revalidatePath(path);
}
