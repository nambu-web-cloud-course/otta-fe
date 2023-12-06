import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
} from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useNavigateTo } from '../../routes/navigate';

const SideBar = () => {
	const goTo = useNavigateTo();
	let { userId } = useParams();
	const { pathname } = useLocation();

	const [currentTab, setCurrentTab] = useState(pathname.split('/').at(-1));

	const navigateTo = (id, url) => {
		setCurrentTab(id);
		goTo(url);
	};

	const tab_info = useMemo(
		() => [
			{ id: 'edit', name: '내 정보', route: `/my-page/${userId}/edit` },
			{ id: 'post-list', name: '작성한 나눔글', route: `/my-page/${userId}/post-list` },
			{ id: 'comment-list', name: '나의 응답 요청', route: `/my-page/${userId}/comment-list` },
		],
		[userId],
	);

	const [, setToken] = useOutletContext();

	const onClickSignOut = () => {
		setToken();
		alert('로그아웃되었어요.');
		goTo('/');
	};

	return (
		<Wrapper>
			<SideBarWrapper>
				<Divider />
				<List>
					{tab_info.map(({ id, name, route }) => (
						<ListItem key={name} disablePadding onClick={() => navigateTo(id, route)}>
							<ListItemButton selected={currentTab == id}>
								<ListItemIcon>
									<CheckroomIcon />
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					<ListItem disablePadding onClick={onClickSignOut}>
						<ListItemButton>
							<ListItemIcon>
								<CheckroomIcon />
							</ListItemIcon>
							<ListItemText primary={'로그아웃'} />
						</ListItemButton>
					</ListItem>
				</List>
			</SideBarWrapper>
			<Spacing />
			<Outlet />
		</Wrapper>
	);
};

export default SideBar;

const SideBarWrapper = styled('div')(({ theme }) => {
	return {
		position: 'fixed',
		top: 90,
		left: 0,
		width: '300px',
		height: '100vh',

		fontWeight: 'bold',
		fontSize: theme.font_sizes.sm,
		borderRight: `1px solid ${theme.colors.NAVY}`,

		background: theme.colors.WHITE,
		zIndex: 5,
	};
});

const Spacing = styled('div')`
	width: 300px;
`;

const Wrapper = styled('div')`
	display: flex;
`;
