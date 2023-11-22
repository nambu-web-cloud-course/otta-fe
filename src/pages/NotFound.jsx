import { Box } from '@mui/material';
import Icon from '../components/common/Icon';
import Description from '../components/findClothingBox/Description';
import { useEffect, useState } from 'react';
import { useNavigateTo } from '../routes/navigate';

const NotFound = () => {
	const goto = useNavigateTo();
	const [second, setSecond] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setSecond(prev => prev - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			goto('/');
		}, 5000);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				height: '80vh',
				justifyContent: 'center',
				alignItems: 'center',
				overflowY: 'hidden',
			}}
		>
			<Icon name="not-found-asset" width={189} height={145} />

			<Description text={`잘못된 페이지예요\n${second}초 뒤 홈으로 돌아가요`}></Description>
		</Box>
	);
};

export default NotFound;
