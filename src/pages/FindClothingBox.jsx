/* eslint-disable no-unused-vars */
import { Outlet, useSearchParams } from 'react-router-dom';
import { Title } from '../components/common/Title';
import {
	Box,
	Button,
	TextField,
	ListItem,
	ListItemIcon,
	ListItemText,
	lighten,
	styled,
	ListItemButton,
} from '@mui/material';
import { FixedSizeList, areEqual } from 'react-window';

import FmdGoodIcon from '@mui/icons-material/FmdGood';
import KakaoMap from '../components/findClothingBox/KakaoMap';
import mock_addr_data from '../data/addrData';
import memoize from 'memoize-one';
import { memo, useState } from 'react';

const Row = memo(({ data, index, style }) => {
	const { items, clickLocation } = data;
	const { addr, x, y } = items[index];

	const onClickListItem = () => {
		clickLocation({ addr, x, y });
	};

	return (
		<ListItem style={style} key={index} component="div" disablePadding>
			<ListItemButton onClick={onClickListItem}>
				<ListItemIcon>
					<FmdGoodIcon />
				</ListItemIcon>
				<ListItemText primary={`${addr}`} secondary={'지도에서 보기'} />
			</ListItemButton>
		</ListItem>
	);
}, areEqual);

Row.displayName = 'LocationRow';

const createItemData = memoize((items, clickLocation) => ({
	items,
	clickLocation,
}));

const FindClothingBox = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageId = searchParams.get('addr');

	const [selectedLocation, setSelectedLocation] = useState({ x: 126.9534911, y: 37.47701556 });

	const onClickLocation = data => {
		setSelectedLocation({ x: data.x, y: data.y });
	};

	const itemData = createItemData(mock_addr_data, onClickLocation);

	return (
		<>
			<Title text={'우리 동네 의류수거함 찾기'} />
			<Box
				component="form"
				sx={{ width: 800, display: 'flex', gap: 1, marginTop: '72px' }}
				noValidate
				autoComplete="off"
			>
				<LocationTextField
					id="outlined-basic"
					label="찾을 주소를 검색해주세요"
					placeholder="ex. 서울특별시 구로구 구로2동"
					variant="outlined"
					fullWidth
				/>
				<SearchButton type="submit" fullWidth variant="contained">
					검색하기
				</SearchButton>
			</Box>
			{pageId && (
				<Box sx={{ width: '100%', display: 'flex' }}>
					<Box sx={{ width: '100%', height: 400, maxWidth: 360 }}>
						<FixedSizeList
							height={400}
							width={360}
							itemSize={70}
							itemCount={mock_addr_data.length}
							overscanCount={5}
							itemData={itemData}
						>
							{Row}
						</FixedSizeList>
					</Box>
					<KakaoMap x={selectedLocation.x} y={selectedLocation.y} />
				</Box>
			)}
			{!pageId && <Outlet />}
		</>
	);
};

export default FindClothingBox;

const LocationTextField = styled(TextField)(({ theme }) => ({
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

const SearchButton = styled(Button)(({ theme }) => ({
	color: theme.colors.WHITE,
	fontSize: theme.font_sizes.sm,
	fontWeight: 'bold',
	backgroundColor: theme.colors.DARK_YELLOW,

	width: 140,
	'&:hover': {
		backgroundColor: lighten(theme.colors.DARK_YELLOW, 0.3),
	},
}));
