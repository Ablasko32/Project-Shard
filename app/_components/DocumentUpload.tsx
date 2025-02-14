'use client';

import { ChangeEvent, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Button from '@/app/_components/Button';
import { uploadFile } from '@/app/_lib/actions';
import toast from 'react-hot-toast';
import { MdOutlineFindInPage } from 'react-icons/md';
import { motion } from 'framer-motion';

// upload documents to serve as knowledge base for retrival
export default function DocumentUpload() {
	const [file, setFile] = useState<File | null>(null);

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	}

	return (
		<form
			action={async formData => {
				try {
					await uploadFile(formData);
					setFile(null);
					toast.success('File uploaded');
				} catch (err) {
					console.error(err);
					toast.error('Error uploading file');
				}
			}}
			className="flex justify-center"
		>
			<div className="flex flex-col items-center gap-2">
				{!file ? (
					<motion.label
						whileHover={{ scale: 0.95 }}
						whileTap={{ scale: 0.9 }}
						transition={{ duration: 0.2 }}
						htmlFor="file"
						className="flex cursor-pointer items-center gap-1 rounded-md bg-lightPrimary px-2 py-1 font-semibold uppercase text-lightBg dark:bg-darkPrimary dark:text-darkBg"
					>
						<MdOutlineFindInPage />
						Select
					</motion.label>
				) : (
					<Button className="">
						<AiOutlineCloudUpload /> Upload
					</Button>
				)}

				{/* display file name and file size */}
				{file && (
					<div className="flex flex-col items-center text-sm text-lightTextSecondary dark:text-darkTextSecondary">
						<p>{file.name}</p>
						<p>{(file.size / (1024 * 1024)).toFixed(4)} MB</p>
					</div>
				)}
			</div>
			<input
				name="file"
				accept=".pdf,.txt,.docx"
				onChange={handleFileChange}
				id="file"
				type="file"
				className="hidden"
			/>
		</form>
	);
}
