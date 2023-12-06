import { useState, useEffect } from 'react';
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
	const [addr, setAddr] = useState('');
	const [addr_detail, setAddrDetail] = useState();
	const [phone, setPhone] = useState();
	const [content, setContent] = useState('');
	const [post_title, setPostTitle] = useState('');
	const [popup, setPopup] = useState(false);
	const [userId, setUserId] = useState('');
	const [phone_error, setPhoneError] = useState(false);
	const [phone_err_msg, setPhoneErrMsg] = useState('');
	const { postId } = useParams();
	const { data, error, triggerFetch } = useApi(`/nanum-post/detail?post_id=${postId}`, 'GET');
	const phoneRegEx = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

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

	const handlePhone = e => {
		if (!phoneRegEx.test(e.currentTarget.value)) {
			setPhoneError(true);
			setPhoneErrMsg('핸드폰번호 형식에 맞지 않습니다');
		} else {
			setPhoneError(false);
			setPhoneErrMsg('');
		}
		setPhone(e.currentTarget.value);
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
					addr: addr,
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
				alert('응답글 작성 실패');
			}
		} catch (error) {
			alert('응답글 작성 중 Error발생');
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
					label="제목"
					type="text"
					variant="standard"
					fullWidth
					onChange={e => setTitle(e.target.value)}
				/>
				<Grid container>
					<Grid item xs>
						<CommentTextField
							label="주소"
							type="text"
							variant="standard"
							fullWidth
							value={addr}
							onChange={e => setAddr(e.target.value)}
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
						{popup && <PostCode address={addr} setAddress={setAddr}></PostCode>}
					</Grid>
				</Grid>
				<CommentTextField
					label="상세주소"
					type="text"
					fullwidth
					variant="standard"
					onChange={e => setAddrDetail(e.target.value)}
					value={addr_detail}
					sx={{ mb: 2 }}
				/>
				<CommentTextField
					label="연락처"
					type="text"
					variant="standard"
					fullWidth
					sx={{ mb: 2 }}
					onChange={handlePhone}
					error={phone_error}
					helperText={phone_err_msg}
				/>
				<CommentTextField
					required
					multiline
					rows="8"
					label="나눔 요청 내용"
					type="text"
					variant="standard"
					fullWidth
					sx={{ mb: 2 }}
					onChange={e => setContent(e.target.value)}
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
