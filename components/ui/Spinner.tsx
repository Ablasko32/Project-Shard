function Spinner({ fullscreen = false }: { fullscreen?: boolean }) {
	return (
		<div
			className={`flex w-full items-center justify-center ${fullscreen ? 'h-screen bg-darkBg' : 'h-full'}`}
		>
			<div className="spinner"></div>
		</div>
	);
}

export default Spinner;
