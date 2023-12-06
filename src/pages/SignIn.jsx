import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Button, lighten, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigateTo } from '../routes/navigate';

export default function SignIn() {
	const goTo = useNavigateTo();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [err_msg, setErrMsg] = useState('');
	const emailRegEx =
		/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

	const [userId, setToken] = useOutletContext();
	const handleEmail = e => {
		setEmail(e.target.value);
	};

	const emailCheck = e => {
		if (!emailRegEx.test(e.currentTarget.value)) {
			setError(true);
			setErrMsg('이메일 형식에 맞지 않습니다');
		} else {
			setError(false);
			setErrMsg('');
		}
	};

	const handlePassword = e => {
		setPassword(e.target.value);
	};

	const onClickLogin = async () => {
		try {
			const response = await axios.post(
				process.env.REACT_APP_SERVER + '/auth/sign_in',
				{
					email,
					password,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);
			if (response.data.success) {
				localStorage.setItem('token', response.data.token);
				setToken(response.data.token);
				alert(`${response.data.nick_name}님 로그인 되었습니다`);
				goTo(`/my-page/${response.id}/post-list`, { replace: true });
			} else {
				alert(response.data.message);
			}
		} catch (error) {
			alert('로그인 중 Error:', error);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			goTo(`/my-page/${userId}/post-list`);
		}
	}, []);

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
							<h1>로그인</h1>
						</Grid>
					</Grid>
					<div>
						<LoginTextField
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

						<LoginTextField
							margin="normal"
							name="password"
							required
							fullWidth
							// id="password"
							label="비밀번호"
							type="password"
							onChange={handlePassword}
							autoComplete="current-password"
						/>

						<LoginButton
							type="submit"
							onClick={onClickLogin}
							variant="contained"
							fullWidth
							sx={{ mt: 5, mb: 4, backgroundColor: '#FAC24D' }}
						>
							로그인
						</LoginButton>
					</div>
					<Grid container>
						<Grid item xs>
							아직 회원이 아니신가요?
						</Grid>
						<Grid item>
							<Link to="/sign-up">
								<LoginTypography sx={{ fontWeight: '600' }}>회원가입</LoginTypography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}
const LoginTypography = styled(Typography)(({ theme }) => ({
	'& hover': {
		color: theme.colors.DARK_YELLOW,
		fontWeight: 700,
	},
}));
const LoginTextField = styled(TextField)(({ theme }) => ({
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

const LoginButton = styled(Button)(({ theme }) => ({
	color: theme.colors.WHITE,
	fontSize: theme.font_sizes.sm,
	fontWeight: 'bold',
	backgroundColor: theme.colors.DARK_YELLOW,
	'&:hover': {
		backgroundColor: lighten(theme.colors.DARK_YELLOW, 0.3),
	},
}));
