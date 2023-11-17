/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from 'react-router-dom';
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
import memoize from 'memoize-one';
import { memo, useEffect, useMemo, useState } from 'react';
import { useApi } from '../hooks/api/useApi';
import Dropdown from '../components/findClothingBox/Dropdown';
import NoData from '../components/findClothingBox/NoData';
import Init from '../components/findClothingBox/Init';

const Row = memo(({ data, index, style }) => {
	const { items, clickLocation } = data;
	const { address, x, y } = items[index];

	const onClickListItem = () => {
		clickLocation({ address, x, y });
	};

	return (
		<ListItem style={style} key={index} component="div" disablePadding>
			<ListItemButton onClick={onClickListItem}>
				<ListItemIcon>
					<FmdGoodIcon />
				</ListItemIcon>
				<ListItemText primary={`${address}`} secondary={'지도에서 보기'} />
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
	const DEFAULT_LOCATION = { x: 126.9061642, y: 37.4632873 };
	const [defaultLocation, setDefaultLocation] = useState(DEFAULT_LOCATION);
	const [selectedLocation, setSelectedLocation] = useState({ x: null, y: null });
	const [triggerPing, setTriggerPing] = useState(0);

	const [searchQuery, setSearchQuery] = useState({ district: '', region: '' });

	const { data, isLoading, error, triggerFetch } = useApi('/find-clothing-box/addr', 'GET', {
		params: { district: searchQuery.district, region: searchQuery.region },
	});

	const onClick = async e => {
		e.preventDefault();
		triggerFetch();
	};

	const onClickLocation = data => {
		setTriggerPing(prev => prev + 1);
		setSelectedLocation({ x: +data.x, y: +data.y });
	};

	const itemData = useMemo(() => createItemData(data, onClickLocation), [data]);

	useEffect(() => {
		if ('geolocation' in navigator) {
			// Prompt user for permission to access their location
			navigator.geolocation.getCurrentPosition(
				// Success callback function
				position => {
					// Get the user's latitude and longitude coordinates
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;

					// Do something with the location data, e.g. display on a map
					setDefaultLocation({ x: lng, y: lat });
				},
				// Error callback function
				error => {
					// Handle errors, e.g. user denied location sharing permissions
					console.error('Error getting user location:', error);
				},
			);
		} else {
			// Geolocation is not supported by the browser
			console.error('Geolocation is not supported by this browser.');
		}
	}, []);

	return (
		<>
			<Title text={'우리 동네 의류수거함 찾기'} />
			<Box
				component="form"
				sx={{ width: 800, display: 'flex', gap: 1, marginTop: '72px' }}
				noValidate
				autoComplete="off"
			>
				<Dropdown setSearchQuery={setSearchQuery} />
				<SearchButton type="submit" fullWidth variant="contained" onClick={onClick}>
					검색하기
				</SearchButton>
			</Box>
			{/* //TODO: 추후 구현 예정 */}
			{/* <Box
				component="form"
				sx={{ width: 800, display: 'flex', gap: 1, marginTop: '10px' }}
				noValidate
				autoComplete="off"
			>
				<LocationTextField
					id="outlined-basic"
					label="찾을 주소를 검색해주세요"
					placeholder="ex. 서울특별시 구로구 구로2동"
					variant="outlined"
					fullWidth
					onChange={onChangeInput}
				/>
				<SearchButton type="submit" fullWidth variant="contained" onClick={onClick}>
					검색하기
				</SearchButton>
			</Box> */}
			{data && (
				<Box sx={{ width: '100%', display: 'flex', marginTop: '30px' }}>
					<Box sx={{ width: '100%', height: 400, maxWidth: 360 }}>
						<FixedSizeList
							height={400}
							width={360}
							itemSize={70}
							itemCount={data.length}
							overscanCount={5}
							itemData={itemData}
						>
							{Row}
						</FixedSizeList>
					</Box>
					<KakaoMap
						defaultX={defaultLocation.x}
						defaultY={defaultLocation.y}
						x={selectedLocation.x}
						y={selectedLocation.y}
						triggerPing={triggerPing}
					/>
				</Box>
			)}
			{!data && !error && <Init />}
			{!data && error && <NoData />}
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
