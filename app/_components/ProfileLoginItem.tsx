'use client';
import { motion } from 'framer-motion';
import { AiOutlinePlus } from 'react-icons/ai';

// login box for choosing currently active profile
export default function ProfileLoginItem({
	username,
	addNew = false,
}: {
	username: string;
	addNew?: boolean;
}) {
	if (addNew)
		return (
			// add new profile button
			<motion.div
				whileHover={{ scale: 1.08 }}
				className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-lightPrimary bg-lightSecondary dark:border-darkPrimary dark:bg-darkSecondary"
			>
				<div className="flex h-12 w-12 items-center justify-center rounded-full text-3xl font-bold">
					<span className="text-lightPrimary dark:text-darkPrimary">
						<AiOutlinePlus />
					</span>
				</div>
				<h3 className="font-semibold capitalize">Add new</h3>
			</motion.div>
		);

	// login to profile button
	return (
		<motion.div
			whileHover={{ scale: 1.08 }}
			className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-lightPrimary bg-lightSecondary dark:border-darkPrimary dark:bg-darkSecondary"
		>
			<div className="flex h-12 w-12 items-center justify-center rounded-full text-3xl font-bold">
				<span className="lowercase text-lightPrimary dark:text-darkPrimary">
					{username.charAt(0)}
				</span>
			</div>
			<h3 className="font-semibold capitalize">{username}</h3>
		</motion.div>
	);
}
