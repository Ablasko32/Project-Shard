'use client';

import { Provider } from 'react-redux';
import store from '@/app/_lib/store';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mounted, setMounted] = useState(false);

	// handling hydration errors with locastorage of redux store
	useEffect(() => {
		setMounted(true);
	}, []);

	// If app is not moutned nothing is returned
	if (!mounted) return <Spinner fullscreen={true} />;

	// if mounted on client , return the provider with children
	return <Provider store={store}>{children}</Provider>;
}
