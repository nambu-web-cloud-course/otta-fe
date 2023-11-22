import { Box, IconButton, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const DragAndDropZone = ({ onFileUpload }) => {
	const [dragOver, setDragOver] = useState(false);

	const handleDragOver = event => {
		event.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = event => {
		event.preventDefault();
		setDragOver(false);
	};

	const handleDrop = useCallback(
		event => {
			event.preventDefault();
			setDragOver(false);
			if (event.dataTransfer.files && event.dataTransfer.files[0]) {
				onFileUpload(event.dataTransfer.files[0]);
			}
		},
		[onFileUpload],
	);

	const handleChange = useCallback(
		event => {
			if (event.target.files && event.target.files[0]) {
				onFileUpload(event.target.files[0]);
			}
		},
		[onFileUpload],
	);

	return (
		<Box
			variant="outlined"
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			style={{
				border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
				padding: 20,
				textAlign: 'center',
				cursor: 'pointer',
				background: dragOver ? '#eee' : '#fafafa',
			}}
		>
			<input
				accept="image/*"
				style={{ display: 'none' }}
				id="raised-button-file"
				multiple
				type="file"
				onChange={handleChange}
			/>
			<label htmlFor="raised-button-file">
				<Box display="flex" flexDirection="column" alignItems="center">
					<IconButton color="primary" aria-label="upload picture" component="span">
						<UploadFileIcon style={{ fontSize: 40 }} />
					</IconButton>
					<Typography>파일을 여기다 끌어다 놓거나 클릭해서 이미지를 추가하세요</Typography>
				</Box>
			</label>
		</Box>
	);
};

export default DragAndDropZone;
