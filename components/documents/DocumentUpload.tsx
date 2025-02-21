'use client';

import { ChangeEvent, useState, useTransition } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Button from '@/components/ui/Button';
import { uploadFile } from '@/lib/actions';
import toast from 'react-hot-toast';
import { MdOutlineFindInPage } from 'react-icons/md';
import { motion } from 'framer-motion';
import TinySpinner from '@/components/ui/TinySpinner';

const MAX_FILE_SIZE = 50 * 1024 * 1024; //50MB next js config required too

// upload documents to serve as knowledge base for retrival
export default function DocumentUpload() {
	const [file, setFile] = useState<File | null>(null);

	const [isPending, startTransition] = useTransition();

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			if (e.target.files[0].size > MAX_FILE_SIZE) {
				toast.error('Maximum size ' + MAX_FILE_SIZE / (1024 * 1024) + 'MB');
			} else {
				setFile(e.target.files[0]);
			}
		}
	}

	return (
		<form
			action={async formData => {
				startTransition(async () => {
					try {
						await uploadFile(formData);
						toast.success('File uploaded');
					} catch (err) {
						console.error(err);
						toast.error(err.message);
					} finally {
						setFile(null);
					}
				});
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

				{/* display file name and file size, when upload clicks then display loader */}
				{file && !isPending && (
					<div className="flex flex-col items-center text-sm text-lightTextSecondary dark:text-darkTextSecondary">
						<p>{file.name}</p>
						<p>{(file.size / (1024 * 1024)).toFixed(4)} MB</p>
					</div>
				)}
				{isPending && <TinySpinner />}
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
