/* eslint-disable no-unused-vars */
import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import theme from '../styles/theme';
import { mock_nanum_detail_data } from '../data/nanumDetailData';
import { Title } from '../components/common/Title';
import CustomButton from '../components/common/CustomButton';
import { useNavigateTo } from '../routes/navigate';

const NanumDetail = () => {
	const goTo = useNavigateTo();
	const [searchParams, setSearchParams] = useSearchParams();
	const [detail, setDetail] = useState(mock_nanum_detail_data);
	const postId = searchParams.get('postId');

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<Box
			component="div"
			sx={{
				width: '80vw',
				display: 'flex',
				flexDirection: 'column',
				gap: '72px',
				marginBottom: '30px',
			}}
		>
			<Box
				component="section"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '32px',
					marginTop: '54px',
					border: `1px solid ${theme.colors.DARK_SKY}`,
					padding: '90px',
					paddingTop: '70px',
				}}
			>
				<StyledSubTitleWrapper>
					<StyledSubTitle>{detail.created_at}</StyledSubTitle>
					<StyledSubTitle>{detail.author}</StyledSubTitle>
				</StyledSubTitleWrapper>
				<Title text={detail.title}></Title>
				{detail.imageList.map((ele, idx) => {
					return (
						<img
							style={{ width: '100%', heigth: 'auto' }}
							key={`image-${idx}`}
							alt="첨부 이미지"
							src={ele}
						/>
					);
				})}
				<StyledContent>{detail.content}</StyledContent>
			</Box>
			{!detail.isMyPost && (
				<Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
					<CustomButton
						width={370}
						height={68}
						fontSize={'base'}
						color={'DARK_SKY'}
						textColor={'WHITE'}
						text={'응답글 작성하기'}
						onClick={() => goTo(`/nanum/${postId}/comment`)}
					/>
				</Box>
			)}
		</Box>
	);
};

export default NanumDetail;

const StyledSubTitleWrapper = styled('div')`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const StyledSubTitle = styled('div')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.xs,
		fontWeight: 'bold',
	};
});

const StyledContent = styled('p')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.sm,
		textAlign: 'center',
		lineHeight: '150%',
		letterSpacing: '0.15px',
	};
});
