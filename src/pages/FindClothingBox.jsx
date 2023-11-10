import { Outlet, useSearchParams } from 'react-router-dom';
import { Title } from '../components/common/Title';
import { Box, Button, TextField, lighten, styled } from '@mui/material';

const FindClothingBox = () => {
	// eslint-disable-next-line no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();

	const pageId = searchParams.get('addr');

	console.log('pageId: ', pageId);

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
			<Outlet />
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
