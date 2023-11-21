import React, { useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomButton from '../components/common/CustomButton';
import Grid from '@mui/material/Grid';
import PostCode from '../components/sign/PostCode.jsx';
import { styled } from '@mui/material';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { styled } from '@mui/material/styles';

export default function CreateComment() {
	const [title, setTitle] = useState('');
	const [addr, setAddr] = useState({
		address: '',
	});
	const [addr_detail, setAddrDetail] = useState();
	const [phone, setPhone] = useState();
	const [content, setContent] = useState('');

	const [popup, setPopup] = useState(false);

	const handleTitleChange = e => {
		setTitle(e.target.value);
	};

	const handleAddrChange = e => {
		setAddr({
			...addr,
			address: e.target.value,
		});
	};

	const handleAddrDetailChange = e => {
		setAddrDetail(e.target.value);
	};

	const handlePhoneChange = e => {
		setPhone(e.target.value);
	};

	const handleContentChange = e => {
		setContent(e.target.value);
	};

	const handleComplete = () => {
		setPopup(!popup);
	};

	const handleSubmit = async () => {
		console.log('title', title);
		console.log('content', content);
		console.log('phone', phone);
		console.log('addr', addr.address);
		console.log('addr_detail', addr_detail);

		try {
			const response = await axios.post(
				process.env.REACT_APP_SERVER + '/nanum/list/comment',
				{
					title: title,
					content: content,
					phone: phone,
					addr: addr.address,
					addr_detail: addr_detail,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (response.data.success) {
				alert('나눔 요청이 등록되었습니다.');
			} else {
				console.error('응답글 작성 실패');
			}
		} catch (error) {
			console.error('응답글 작성 중 Error:', error);
		}
	};

	return (
		<Box
			sx={{
				width: 700,
				padding: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				'& .MuiTextField-root': { width: '35ch' },
			}}
		>
			<h1>새 주인이 되어보세요</h1>
			<Grid container>
				<Grid item xs>
					<input
						label="나눔글제목"
						type="text"

						// variant="filled"
						// fullWidth
						// sx={{mb:4,borderBottom:0}}
					/>
				</Grid>
				<Grid item>
					<CustomButton
						width={150}
						height={44}
						fontSize={'xs'}
						color={'WHITE'}
						textColor={'NAVY'}
						text={'나눔 글 보기'}
					/>
				</Grid>
			</Grid>
			<Box
				component="form"
				sx={{
					width: 500,
					maxWidth: '100%',
					'& .MuiTextField-root': { m: 0 },

					border: 0.5,
					padding: 5,
					display: 'flex',
					flexDirection: 'column',
					borderRadius: 3,
					// 'alignItems' : 'center'
				}}
				noValidate
				autoComplete="off"
			>
				<CommentTextField
					required
					margin="normal"
					name="title"
					label="제목"
					value={title ? title : '     '}
					type="text"
					variant="standard"
					fullWidth
					onChange={handleTitleChange}
				/>
				<Grid container>
					<Grid item xs>
						<CommentTextField
							name="addr"
							label="주소"
							type="text"
							variant="standard"
							fullWidth
							value={addr.address}
							onChange={handleAddrChange}
						/>
					</Grid>
					<Grid item>
						<CustomButton
							width={120}
							height={44}
							fontSize={'xxs'}
							color={'NAVY'}
							textColor={'WHITE'}
							text={'직접 주소 입력'}
							onClick={handleComplete}
						/>
						{popup && <PostCode address={addr.address} setAddress={setAddr}></PostCode>}
					</Grid>
				</Grid>
				<CommentTextField
					name="addr_detail"
					label="상세주소"
					type="text"
					fullwidth
					variant="standard"
					onChange={handleAddrDetailChange}
					value={addr_detail}
					sx={{ mb: 2 }}
				/>
				<CommentTextField
					name="phone"
					label="연락처"
					type="text"
					variant="standard"
					fullWidth
					sx={{ mb: 2 }}
					onChange={handlePhoneChange}
				/>
				<CommentTextField
					required
					name="content"
					multiline
					rows="8"
					label="나눔 요청 내용"
					type="text"
					variant="standard"
					fullWidth
					sx={{ mb: 2 }}
					onChange={handleContentChange}
				/>
				<CustomButton
					width={200}
					height={60}
					fontSize={'xs'}
					color={'DARK_YELLOW'}
					textColor={'WHITE'}
					text={'기부 요청 보내기'}
					onClick={handleSubmit}
				/>
			</Box>
		</Box>
	);
}

const CommentTextField = styled(TextField)(({ theme }) => ({
	'& label.Mui-focused': {
		color: theme.colors.NAVY,
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: theme.colors.DARK_GRAY,
		},
		'&:hover fieldset': {
			borderColor: theme.colors.DARK_GRAY,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme.colors.DARK_GRAY,
		},
	},
}));
