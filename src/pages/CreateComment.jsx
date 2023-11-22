import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomButton from '../components/common/CustomButton';
import Grid from '@mui/material/Grid';
import PostCode from '../components/sign/PostCode.jsx';
import { styled } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/api/useApi';
import { useNavigateTo } from '../routes/navigate';

export default function CreateComment() {
	const goTo = useNavigateTo();
	const [title, setTitle] = useState('');
	const [addr, setAddr] = useState({
		address: '',
	});
	const [addr_detail, setAddrDetail] = useState();
	const [phone, setPhone] = useState();
	const [content, setContent] = useState('');
	const [post_title, setPostTitle] = useState('');
	const [popup, setPopup] = useState(false);
	const [userId, setUserId] = useState('');
	const { postId } = useParams();
	const { data, error, triggerFetch } = useApi(`/nanum-post/detail?post_id=${postId}`, 'GET');

	useEffect(() => {
		if (data) {
			setPostTitle(data.title);
		}
		if (error) {
			alert('문제가 발생했어요 잠시 뒤에 다시 시도해주세요');
		}
	}, [data, error]);

	useEffect(() => {
		triggerFetch();
		const token = localStorage.getItem('token');
		const decodedToken = JSON.parse(atob(token.split('.')[1]));
		setUserId(decodedToken.user_id);
	}, []);

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

	const handleSubmit = async e => {
		e.preventDefault();
		if (!title || !content || !phone || !addr || !addr_detail) {
			alert('빠진 항목이 없도록 작성해 주세요');
			return;
		}

		try {
			const response = await axios.post(
				process.env.REACT_APP_SERVER + '/nanum/list/comment',
				{
					title: title,
					content: content,
					phone: phone,
					addr: addr.address,
					addr_detail: addr_detail,
					post_id: postId,
					user_id: userId,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (response.data.success) {
				alert('나눔 요청이 등록되었습니다.');
				goTo(`/my-page/${userId}/comment-list`);
				return;
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
					<input value={post_title} type="text" />
				</Grid>
				<Grid item>
					<CustomButton
						width={150}
						height={44}
						fontSize={'xs'}
						color={'WHITE'}
						textColor={'NAVY'}
						text={'나눔 글 보기'}
						onClick={() => goTo(`/nanum/detail?postId=${postId}`)}
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
					id="test"
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
