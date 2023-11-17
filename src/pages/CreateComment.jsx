import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';

export default function CreateComment() {
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [phone, setPhone] = useState();
	const [addr, setAddr] = useState();

	const handleTitleChange = e => {
		setTitle(e.Target.value);
	};

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 0.5 },
				width: 500,
			}}
			noValidate
			autoComplete="off"
		>
			<Title text={'새 주인을 찾습니다'} />
			<TextField filled sx={{ width: 400 }}></TextField>
			<Box sx={{ border: 0.5, m: 1, padding: 2, width: 400 }}>
				<TextField
					variant="standard"
					id="outlined-multiline-static"
					label="제목"
					defaultValue=" "
					size="small"
					onChange={handleTitleChange}
				/>
				<TextField
					id="outlined-multiline-static"
					label="내용"
					multiline
					variant="standard"
					rows={5}
					defaultValue=" "
					size="small"
					onChange={handleContentChange}
				/>
				<TextField
					variant="standard"
					id="outlined-multiline-static"
					label="전화번호"
					defaultValue=" "
					size="small"
					onChange={handlePhoneChange}
				/>
				<TextField
					variant="standard"
					id="outlined-multiline-static"
					label="주소"
					defaultValue=" "
					size="small"
					onChange={handleAddrChange}
				/>
				<CustomButton
					width={370}
					height={68}
					fontSize={'base'}
					color={'DARK_SKY'}
					textColor={'WHITE'}
					text={'주소 찾기'}
					type="submit"
					onClick={handleComplete}
					variant="contained"
					// sx={{ mt: 2, marginLeft: 1 }}
				/>
				{popup && <PostCode address={addr} setAddress={setAddr}></PostCode>}
				<TextField
					variant="standard"
					id="outlined-multiline-static"
					label="상세주소"
					defaultValue=" "
					size="small"
					onChange={handleDetailChange}
				/>
			</Box>
		</Box>
	);
}
