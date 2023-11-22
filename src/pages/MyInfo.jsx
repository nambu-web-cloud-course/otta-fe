/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, lighten, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PostCode from '../components/sign/PostCode.jsx';
import axios from 'axios';
import { useNavigateTo } from '../routes/navigate';
import client from '../hooks/api/client.js';
import '../styles/myinfo.css';

export default function MyInfo() {
	const goTo = useNavigateTo();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [check_password, setCheckPassword] = useState('');
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

	useEffect(() => {
		const response = axios.get(
			process.env.REACT_APP_SERVER + '/my-page/edit/user-info',
			{},
			{
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
			},
		);
		if (response) {
			response
				.then(data => data.data)
				.then(data => data.data)
				.then(data => {
					setEmail(data.email);
					setNickname(data.nick_name);
					setAddr(data.addr);
					setAddrdetail(data.addr_detail);
					setPhone(data.phone);
				});
		}
	}, []);

	const handleEmail = e => {
		if (!emailRegEx.test(e.currentTarget.value)) {
			setError(true);
			setErrMsg('이메일 형식에 맞지 않습니다');
		} else {
			setError(false);
			setErrMsg('');
		}
		setEmail(e.currentTarget.value);
	};

	const handleCheckPassword = e => {
		if (password === check_password) {
			setPwError(false);
			setPwErrMsg('');
		} else {
			setPwError(true);
			console.log(`password: ${password} passwordcheck: ${check_password}`);
			setPwErrMsg('비밀번호가 일치하지 않습니다.');
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
		if (!email || !password || !nick_name || !addr || !addr_detail || !phone) {
			alert('비어 있는 항목을 모두 채워주세요');
			return;
		}
		if (pw_error) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		try {
			const response = await client.put(
				'/my-page/edit/user-info',
				{
					password,
					nick_name,
					phone,
					addr,
					addr_detail,
				},
				{
					headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
				},
			);
			console.log('response', response);
			if (response.data.success) {
				alert('회원정보 수정이 완료되었습니다.');
				// goTo(`/my-page/${response.id}/post-list`);
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
		<Container component="main" maxWidth="sm" sx={{ border: 0.5, borderRadius: 1, padding: 6 }}>
			<Box component="form" onSubmit={handleSubmit} sx={{ ml: 3, mr: 3, pb: 3 }}>
				<h1>내 정보</h1>
				<div className="container">
					<div className="titles">
						<p>이메일*</p>
						<p>비밀번호*</p>
						<p>비밀번호확인*</p>
						<p>별명*</p>
						<p>전화번호*</p>
						<p>주소*</p>
						<p>상세주소*</p>
					</div>
					<div className="inputs">
						<TextField
							variant="standard"
							margin="normal"
							value={email}
							error={error}
							required
							fullWidth
							type="text"
							onChange={handleEmail}
							autoComplete="email"
							helperText={err_msg}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							// type="password"
							onChange={e => setPassword(e.target.value)}
							variant="standard"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							// type="password"
							onChange={e => setCheckPassword(e.target.value)}
							onBlur={handleCheckPassword}
							error={pw_error}
							helperText={pw_err_msg}
							variant="standard"
						/>
						<TextField
							margin="normal"
							value={nick_name}
							required
							fullWidth
							type="text"
							onChange={e => setNickname(e.target.value)}
							variant="standard"
						/>
						<TextField
							margin="normal"
							value={phone}
							required
							fullWidth
							type="text"
							error={phone_error}
							helperText={phone_err_msg}
							onChange={handlePhone}
							variant="standard"
						/>
						<TextField
							margin="normal"
							value={addr}
							required
							fullWidth
							type="text"
							onChange={e => setAddr(e.target.value)}
							variant="standard"
						/>
						<Grid container>
							<Grid item xs>
								<TextField
									margin="normal"
									required
									fullWidth
									type="text"
									onChange={e => setAddrdetail(e.target.value)}
									value={addr_detail}
									variant="standard"
								/>
							</Grid>
							<Grid item>
								<button className="infobutton" type="button" onClick={handleComplete}>
									주소찾기
								</button>
								{popup && <PostCode address={addr} setAddress={setAddr}></PostCode>}
							</Grid>
						</Grid>
						<p className="info">* 필수 입력사항입니다</p>
						<button type="submit" className="infobutton long">
							정보 수정
						</button>
					</div>
				</div>
			</Box>
		</Container>
	);
}
