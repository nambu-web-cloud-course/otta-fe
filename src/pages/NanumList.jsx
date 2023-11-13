/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Title } from '../components/common/Title';
import { Box, Card, CardActions, CardContent, CardMedia, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CustomButton from '../components/common/CustomButton';
import { mock_nanum_list_data } from '../data/nanumListData';
import { useNavigateTo } from '../routes/navigate';

const NanumList = () => {
	const goTo = useNavigateTo();
	const [postList, setPostList] = useState(mock_nanum_list_data);

	const STATUS = [
		{ status: 1, text: '주인 찾기 진행 중' },
		{ status: 2, text: '주인 찾기 거래 중' },
		{ status: 3, text: '주인 찾기 완료' },
	];

	const getStatusText = status => {
		return STATUS.filter(ele => ele.status === status)[0].text;
	};

	const goToDetailResponse = e => {
		e.stopPropagation();
		goTo('/my-page/:userId/post-list');
	};

	return (
		<Box
			component="section"
			sx={{
				width: '80vw',
				display: 'flex',
				flexDirection: 'column',
				gap: '32px',
				marginTop: '90px',
			}}
		>
			<Title text={'새 주인을 찾습니다'} />
			<ButtonWrapper>
				<CustomButton
					width={220}
					height={44}
					fontSize={'xs'}
					color={'DARK_SKY'}
					textColor={'WHITE'}
					text={'헌옷 기부글 작성하기'}
					onClick={() => goTo('/nanum/create-post')}
				/>
			</ButtonWrapper>
			<Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
				{postList.map(ele => {
					return (
						<Grid key={ele.id}>
							<Card sx={{ maxWidth: 360 }} onClick={() => goTo(`/nanum/detail?postId=${ele.id}`)}>
								<CardMedia sx={{ height: 140 }} image={ele.thumbnail} title={ele.title} />
								<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
									<StyledDateTypo>{ele.created_at}</StyledDateTypo>
									<StyledTitle>{ele.title}</StyledTitle>
									<StyledContent>{ele.content}</StyledContent>
								</CardContent>
								<CardActions>
									<CustomButton
										width={120}
										height={40}
										fontSize={'xxs'}
										color={'DARK_YELLOW'}
										textColor={'BLACK'}
										text={getStatusText(ele.status)}
									/>
									{ele.isMyPost && (
										<CustomButton
											width={120}
											height={40}
											fontSize={'xxs'}
											color={'BEIGE'}
											textColor={'BLACK'}
											text={'응답글 보기'}
											onClick={goToDetailResponse}
										/>
									)}
								</CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default NanumList;

const ButtonWrapper = styled('div')`
	display: flex;
	justify-content: end;
	padding-right: '30px';
`;

const StyledDateTypo = styled('span')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.xxs,
		color: theme.colors.DARK_PURPLE,
	};
});

const StyledTitle = styled('span')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.sm,
		color: theme.colors.BLACK,
		fontWeight: 'bold',
	};
});

const StyledContent = styled('p')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.xs,
		color: theme.colors.DARK_GRAY,
	};
});
