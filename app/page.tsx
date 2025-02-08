import { redirect } from 'next/navigation';

// redirect to chat
export default function Home() {
	return redirect('/chat');
}
