/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, lighten, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PostCode from '../components/sign/PostCode.jsx';
import axios from 'axios';
import { useNavigateTo } from '../routes/navigate';
import client from '../hooks/api/client.js';

export default function SignUp() {
	const goTo = useNavigateTo();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [check_password, setCheckPassword] = useState('');
	const [name, setName] = useState('');
	const [nick_name, setNickname] = useState('');
	const [phone, setPhone] = useState('');
	const [addr, setAddr] = useState('');
	const [addr_detail, setAddrdetail] = useState('');
	const [error, setError] = useState(false);
	const [err_msg, setErrMsg] = useState('');
	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
	const phoneRegEx = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
	const [pw_error, setPwError] = useState(false);
	const [pw_err_msg, setPwErrMsg] = useState('');
	const [phone_error, setPhoneError] = useState(false);
	const [phone_err_msg, setPhoneErrMsg] = useState('');
	const [popup, setPopup] = useState(false);

	const emailCheck = e => {
		if (!emailRegEx.test(e.currentTarget.value)) {
			setError(true);
			setErrMsg('이메일 형식에 맞지 않습니다');
		} else {
			setError(false);
			setErrMsg('');
		}
		setEmail(e.target.value);
	};

	const handleMatching = () => {
		if (password !== check_password) {
			setPwError(true);
			setPwErrMsg('비밀번호가 일치하지 않습니다.');
		} else {
			setPwError(false);
			setPwErrMsg('');
		}
	};

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
		if (!email || !password || !name || !nick_name || !addr || !addr_detail || !phone) {
			alert('비어 있는 항목을 모두 채워주세요');
			return;
		}
		if (pw_error) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		try {
			const response = await client.post(
				'/auth/sign_up',
				{
					email,
					password,
					name,
					nick_name,
					addr,
					addr_detail,
					phone,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);
			if (response.data.success) {
				alert('회원가입이 완료되었습니다.');
				goTo(`/my-page/${response.id}/post-list`);
			} else {
				if (response.data.message) {
					alert(response.data.message);
				}
			}
		} catch (error) {
			alert('회원 등록 중 에러 발생');
		}
	};

	return (
		<>
			<Container component="main" maxWidth="sm" sx={{ border: 0.5, borderRadius: 1, padding: 6 }}>
				<Box component="form" onSubmit={handleSubmit} sx={{ ml: 3, mr: 3, pb: 3 }}>
					<Grid container sx={{ borderBottom: 1, mb: 4 }}>
						<Grid item>
							<Avatar sx={{ m: 1, mt: 3.5, bgcolor: '#545473' }}>
								<LockOutlinedIcon />
							</Avatar>
						</Grid>
						<Grid item>
							<h1>회원가입</h1>
						</Grid>
					</Grid>

					<SignUpTextField
						margin="normal"
						error={error}
						required
						fullWidth
						label="이메일 주소"
						type="text"
						onChange={emailCheck}
						autoComplete="email"
						helperText={err_msg}
					/>
					<SignUpTextField
						margin="normal"
						required
						fullWidth
						label="비밀번호"
						type="password"
						onChange={e => setPassword(e.target.value)}
					/>
					<SignUpTextField
						margin="normal"
						required
						fullWidth
						label="비밀번호 확인"
						type="password"
						onChange={e => setCheckPassword(e.target.value)}
						onBlur={handleMatching}
						error={pw_error}
						helperText={pw_err_msg}
					/>
					<SignUpTextField
						margin="normal"
						required
						fullWidth
						label="이름"
						type="text"
						onChange={e => setName(e.target.value)}
					/>
					<SignUpTextField
						margin="normal"
						required
						fullWidth
						label="별명을 정해 주세요"
						type="text"
						onChange={e => setNickname(e.target.value)}
					/>
					<SignUpTextField
						margin="normal"
						required
						fullWidth
						label="핸드폰번호"
						type="text"
						onChange={handlePhone}
						error={phone_error}
						helperText={phone_err_msg}
					/>
					<SignUpTextField
						margin="normal"
						required
						fullWidth
						disabled
						label="도로명 주소"
						type="text"
						onChange={e => setAddr(e.target.value)}
						value={addr}
					/>
					<Grid container>
						<Grid item xs>
							<SignUpTextField
								margin="normal"
								required
								fullWidth
								label="상세주소"
								type="text"
								onChange={e => setAddrdetail(e.target.value)}
								value={addr_detail}
							/>
						</Grid>
						<Grid item>
							<SignUpButton
								type="button"
								onClick={handleComplete}
								variant="contained"
								sx={{ mt: 5, marginLeft: 1 }}
							>
								주소찾기
							</SignUpButton>
							{popup && <PostCode address={addr} setAddress={setAddr}></PostCode>}
						</Grid>
					</Grid>

					<Typography>* 필수 입력사항입니다</Typography>
					<div>
						<SignUpButton type="submit" variant="contained" fullWidth sx={{ mt: 5, mb: 5 }}>
							회원가입
						</SignUpButton>
					</div>
					<Grid container>
						<Grid item xs>
							<Typography>이미 회원이신가요?</Typography>
						</Grid>
						<Grid item>
							<Link to="/sign-in">
								<SignUpTypography sx={{ fontWeight: '600' }}>로그인</SignUpTypography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}

const SignUpTypography = styled(Typography)(({ theme }) => ({
	'& hover': {
		color: theme.colors.DARK_YELLOW,
		fontWeight: 700,
	},
}));
const SignUpTextField = styled(TextField)(({ theme }) => ({
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

const SignUpButton = styled(Button)(({ theme }) => ({
	mb: 5,
	mt: 5,
	color: theme.colors.WHITE,
	fontSize: theme.font_sizes.sm,
	fontWeight: 'bold',
	backgroundColor: theme.colors.DARK_YELLOW,
	'&:hover': {
		backgroundColor: lighten(theme.colors.DARK_YELLOW, 0.3),
	},
}));
