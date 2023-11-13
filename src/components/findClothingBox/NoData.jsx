import { Box, Button, lighten, styled } from '@mui/material';
import ClothingBoxImage from '../../assets/clothing_box_no_data.png';
import Description from './Description';
import { useNavigate } from 'react-router-dom';

const NoData = () => {
	const navigate = useNavigate();
	const goToNamumList = () => navigate('/nanum/list');
	return (
		<Box
			component="section"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '40px',
				paddingTop: '72px',
			}}
		>
			<Description text={'검색 결과가 없습니다.'} />
			<img src={ClothingBoxImage} alt="의류수거함 이미지" width={282} height={240} />
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '62px',
				}}
			>
				<Description text={'깨끗한 옷이면 나눔은 어떠세요?'} />
				<GoToNamumButton onClick={goToNamumList}>헌옷 나누러 가기</GoToNamumButton>
			</Box>
		</Box>
	);
};

export default NoData;

const GoToNamumButton = styled(Button)(({ theme }) => ({
	color: theme.colors.NAVY,
	fontSize: theme.font_sizes.xs,
	fontWeight: 'bold',
	backgroundColor: theme.colors.DARK_BEIGE,

	width: 140,
	'&:hover': {
		backgroundColor: lighten(theme.colors.DARK_BEIGE, 0.3),
	},
}));
