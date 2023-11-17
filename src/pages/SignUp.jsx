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
// import axios from 'axios';

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [check_password, setCheckPassword] = useState('');
	const [name, setName] = useState('');
	const [nickname, setNickname] = useState('');
	const [phone, setPhone] = useState('');
	const [addr, setAddr] = useState({
		address: '',
	});
	const [addr_detail, setAddrdetail] = useState('');
	const [error, setError] = useState(false);
	const [err_msg, setErrMsg] = useState('');
	//email& 비밀번호 정규식
	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
	// const passwordRegEx = /^[A-Za-z0-9]{8,20}$/
	const [pw_error, setPwError] = useState(false);
	const [pw_err_msg, setPwErrMsg] = useState('');

	const [popup, setPopup] = useState(false);

	const emailCheck = e => {
		if (!emailRegEx.test(e.currentTarget.value)) {
			setError(true);
			setErrMsg('이메일 형식에 맞지 않습니다');
		} else {
			setError(false);
			setErrMsg('');
		}
	};

	const handleEmail = e => {
		setEmail(e.currentTarget.value);
	};
	const handlePassword = e => {
		setPassword(e.currentTarget.value);
	};

	const handleCheckPassword = e => {
		setCheckPassword(e.currentTarget.value);
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

	const handleName = e => {
		setName(e.currentTarget.value);
	};

	const handleNickname = e => {
		setNickname(e.currentTarget.value);
	};

	const handlePhone = e => {
		setPhone(e.currentTarget.value);
	};

	const handleAddr = e => {
		setAddr({
			...addr,
			[e.target.name]: e.target.value,
		});
	};
	const handleAddrDetail = e => {
		setAddrdetail(e.target.value);
	};

	const handleComplete = () => {
		setPopup(!popup);
	};
	const onClickSignUp = () => {
		console.log(
			`아이디: ${email} 비밀번호: ${password} 비밀번호확인: ${check_password} 
			이름: ${name} 닉네임: ${nickname} 핸드폰:${phone}  
		  주소:${addr.address} ${addr_detail} `,
		);
	};

	return (
		<>
			<Container component="main" maxWidth="sm" sx={{ border: 0.5, borderRadius: 1, padding: 6 }}>
				<Box sx={{ ml: 3, mr: 3, pb: 3 }}>
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
						name="email"
						error={error}
						required
						fullWidth
						label="이메일 주소"
						type="text"
						onChange={handleEmail}
						onBlur={emailCheck}
						autoComplete="email"
						helperText={err_msg}
					/>
					<SignUpTextField
						margin="normal"
						name="password"
						required
						fullWidth
						label="비밀번호"
						type="password"
						onChange={handlePassword}
					/>
					<SignUpTextField
						margin="normal"
						required
						fullWidth
						label="비밀번호 확인"
						type="password"
						onChange={handleCheckPassword}
						onBlur={handleMatching}
						error={pw_error}
						helperText={pw_err_msg}
					/>
					<SignUpTextField
						margin="normal"
						name="name"
						required
						fullWidth
						label="이름"
						type="text"
						onChange={handleName}
					/>
					<SignUpTextField
						margin="normal"
						name="nickname"
						required
						fullWidth
						label="별명을 정해 주세요"
						type="text"
						onChange={handleNickname}
					/>
					<SignUpTextField
						margin="normal"
						name="phone"
						required
						fullWidth
						label="핸드폰번호"
						type="text"
						onChange={handlePhone}
					/>
					<SignUpTextField
						margin="normal"
						name="addr_road"
						required
						fullWidth
						disabled
						label="도로명 주소"
						type="text"
						onChange={handleAddr}
						value={addr.address}
					/>
					<Grid container>
						<Grid item xs>
							<SignUpTextField
								margin="normal"
								name="addr_detail"
								required
								fullWidth
								label="상세주소"
								type="text"
								onChange={handleAddrDetail}
								value={addr_detail}
							/>
						</Grid>
						<Grid item>
							<SignUpButton
								type="submit"
								onClick={handleComplete}
								variant="contained"
								sx={{ mt: 2, marginLeft: 1 }}
							>
								주소찾기
							</SignUpButton>
							{popup && <PostCode address={addr} setAddress={setAddr}></PostCode>}
						</Grid>
					</Grid>

					<Typography>* 필수 입력사항입니다</Typography>
					<div>
						<SignUpButton
							type="submit"
							onClick={onClickSignUp}
							variant="contained"
							fullWidth
							sx={{ mt: 5, mb: 5 }}
						>
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