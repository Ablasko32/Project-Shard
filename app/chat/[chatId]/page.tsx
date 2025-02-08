export default async function page({
	params,
}: {
	params: Promise<{ chatId: string }>;
}) {
	const { chatId } = await params;

	return <div>page ,chatId:{chatId}</div>;
}
