import { NextResponse, type NextRequest } from 'next/server';
import ollama from 'ollama';

export async function GET(request: NextRequest) {
	try {
		const response = await ollama.list();

		return NextResponse.json({
			data: response,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({
			err: err,
		});
	}
}
