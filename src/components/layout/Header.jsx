import { Avatar, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Icon from '../common/Icon';
import CustomButton from '../common/CustomButton';
import { useNavigateTo } from '../../routes/navigate';
import { emoji_mapping_data } from '../../data/emojiData';
import { useApi } from '../../hooks/api/useApi';
import client from '../../hooks/api/client';

const Header = () => {
	const goTo = useNavigateTo();
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [userInfo, setUserInfo] = useState({});

	const { data, triggerFetch } = useApi('/my-page/edit/user-info', 'GET');

	useEffect(() => {
		if (token) {
			client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		} else {
			delete client.defaults.headers.common['Authorization'];
			localStorage.removeItem('token');
		}
		triggerFetch();
	}, [setToken, token]);

	useEffect(() => {
		if (data) {
			setUserInfo(data);
		} else {
			setUserInfo({});
		}
	}, [data]);

	return (
		<>
			<StyledHeader>
				<NavWrapper>
					<LogoWrapper onClick={() => goTo('/')}>
						<Icon name="logo" width={42} height={43} />
						<LogoText>옷다</LogoText>
					</LogoWrapper>
					<NavButton onClick={() => goTo('/tip-clothing-recycle')}>올바른 의류 배출법</NavButton>
					<NavButton onClick={() => goTo('/find-clothing-box')}>의류수거함 찾기</NavButton>
					<NavButton onClick={() => goTo('/nanum/list')}>헌옷 나눠요</NavButton>
				</NavWrapper>
				<AuthButtonWrapper>
					{token && (
						<>
							<GreetingText>{userInfo['nick_name']}님 안녕하세요 🤚</GreetingText>
							<Avatar>{emoji_mapping_data[userInfo['emoji']]}</Avatar>
							<CustomButton
								width={100}
								height={44}
								fontSize={'xs'}
								color={'WHITE'}
								textColor={'NAVY'}
								text={'마이페이지'}
								onClick={() => goTo(`/my-page/${userInfo['id']}/edit`)}
							/>
						</>
					)}
					{!token && (
						<>
							<CustomButton
								width={80}
								height={44}
								fontSize={'xs'}
								color={'WHITE'}
								textColor={'NAVY'}
								text={'로그인'}
								onClick={() => goTo('/sign-in')}
							/>
							<CustomButton
								width={100}
								height={44}
								fontSize={'xs'}
								color={'NAVY'}
								textColor={'WHITE'}
								text={'회원가입'}
								onClick={() => goTo('/sign-up')}
							/>
						</>
					)}
				</AuthButtonWrapper>
			</StyledHeader>
			<Spacing />
			<Outlet context={[userInfo['id'], setToken]} />
		</>
	);
};

export default Header;

const StyledHeader = styled('header')(({ theme }) => {
	return {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '90px',

		display: 'flex',
		borderBottom: `1px solid ${theme.colors.NAVY}`,
		alignItems: 'center',
		justifyContent: 'space-around',

		background: `${theme.colors.WHITE}`,
		zIndex: 5,
	};
});

const Spacing = styled('div')(() => {
	return {
		height: '90px',
	};
});

const LogoText = styled('span')(({ theme }) => {
	return {
		color: theme.colors.BLACK,
		fontSize: theme.font_sizes.base,
		fontWeight: 'bold',
	};
});

const NavButton = styled('button')(({ theme }) => {
	return {
		color: theme.colors.NAVY,
		fontSize: theme.font_sizes.sm,
		fontWeight: 'bold',
	};
});

const NavWrapper = styled('div')`
	display: flex;
	gap: 32px;
`;

const AuthButtonWrapper = styled('div')`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const LogoWrapper = styled('button')`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const GreetingText = styled('span')(({ theme }) => {
	return {
		color: theme.colors.BLACK,
		fontSize: theme.font_sizes.xs,
	};
});
