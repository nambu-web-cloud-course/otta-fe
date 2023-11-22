/* eslint-disable no-unused-vars */
import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import theme from '../styles/theme';
import { Title } from '../components/common/Title';
import CustomButton from '../components/common/CustomButton';
import { useNavigateTo } from '../routes/navigate';
import { useApi } from '../hooks/api/useApi';

const NanumDetail = () => {
	const goTo = useNavigateTo();
	const [searchParams, setSearchParams] = useSearchParams();
	const [detail, setDetail] = useState(null);
	const postId = searchParams.get('postId');

	const { data, error, triggerFetch } = useApi(`/nanum-post/detail?post_id=${postId}`, 'GET');

	useEffect(() => {
		if (data) {
			setDetail(data);
		}
		if (error) {
			alert('문제가 발생했어요 잠시 뒤에 다시 시도해주세요');
		}
	}, [data, error]);

	useEffect(() => {
		triggerFetch();
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
				{!detail && <span>작성한 나눔글이 없습니다</span>}
				{detail && (
					<>
						<StyledSubTitleWrapper>
							<StyledSubTitle>{detail.createdAt}</StyledSubTitle>
							<StyledSubTitle>{detail.nick_name}</StyledSubTitle>
						</StyledSubTitleWrapper>
						<Title text={detail.title}></Title>
						{detail.image_url.map((ele, idx) => {
							return (
								<img
									style={{ width: '100%', heigth: 'auto' }}
									key={`image-${idx}`}
									alt="첨부 이미지"
									src={ele.url}
								/>
							);
						})}
						<StyledContent>{detail.content}</StyledContent>
					</>
				)}
			</Box>
			{detail && !detail.is_my_post && (
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
