import { Box } from '@mui/material';
import ClothingBoxImage from '../../assets/clothing_box.png';
import Description from './Description';

const Init = () => {
	return (
		<Box
			component="section"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '70px',
				paddingTop: '120px',
			}}
		>
			<img src={ClothingBoxImage} alt="의류수거함 이미지" width={167} height={235} />
			<Description text={'Tip. 서울시 12개구에는 5,000개 이상의 의류수거함이 있어요!'} />
		</Box>
	);
};

export default Init;
