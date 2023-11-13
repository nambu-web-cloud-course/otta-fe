import { styled } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Icon from '../common/Icon';
import CustomButton from '../common/CustomButton';
import { useNavigateTo } from '../../routes/navigate';

const Header = () => {
	const goTo = useNavigateTo();
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
				</AuthButtonWrapper>
			</StyledHeader>
			<Spacing />
			<Outlet />
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
`;

const LogoWrapper = styled('button')`
	display: flex;
	align-items: center;
	gap: 20px;
`;
