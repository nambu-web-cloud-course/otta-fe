import { styled } from '@mui/material';
import React from 'react';
import Icon from '../components/common/Icon';

const HOME_IMAGE_URL = [
	'https://stotta1128.blob.core.windows.net/assets/First-Right-Asset.png',
	'https://stotta1128.blob.core.windows.net/assets/Second-Left-Asset.png',
	'https://stotta1128.blob.core.windows.net/assets/Third-Right-Asset.png',
];

const Home = () => {
	return (
		<>
			<ContentWrapper>
				<ContentInner>
					<ContentLeftText>
						옷다는{'\n'}옷장 다이어트의 줄임말로,{'\n'}
						{'\n'}재활용 의류 배출을 활성화하기 위해{'\n'}노력하는 사람들이 방문하는 곳입니다.{'\n'}
						{'\n'}지속 가능한 패션으로 더 나은 미래를 위해{'\n'}지금 시작하세요.
					</ContentLeftText>
				</ContentInner>
				<ContentInner>
					<Image src={HOME_IMAGE_URL[0]} alt="메인 첫 이미지" />
				</ContentInner>
			</ContentWrapper>
			<ContentWrapper>
				<ContentInner>
					<Image src={HOME_IMAGE_URL[1]} alt="메인 두번째 이미지" />
				</ContentInner>
				<ContentInner>
					<ContentRightText>
						우리 동네 어디쯤에 의류수거함이 있는지{'\n'}
						궁금하지 않으신가요?{'\n'}
						{'\n'}주소 검색으로 간편하게{'\n'}
						의류수거함 위치를 조회하세요.{'\n'}
						{'\n'}*현재 서울특별시의 12개구 한정
					</ContentRightText>
				</ContentInner>
			</ContentWrapper>
			<ContentWrapper>
				<ContentInner>
					<ContentLeftText>
						이제는 더 이상 입지 않는 옷,{'\n'}
						버리기에는 아까우신가요?{'\n'}
						{'\n'}헌옷 나눔터에 나눠주고 싶은 옷을{'\n'}
						널리널리 알려주세요.{'\n'}
						{'\n'}또는 다른 사람의 나눔을 보고{'\n'}
						옷을 나눔받으세요!{'\n'}
						{'\n'}자원 절약에 한걸음 나아갔어요.
					</ContentLeftText>
				</ContentInner>
				<ContentInner>
					<Image src={HOME_IMAGE_URL[2]} alt="메인 세번째 이미지" />
				</ContentInner>
				<BackgroundWrapper>
					<Icon name="background" width={1052} height={1047} />
				</BackgroundWrapper>
			</ContentWrapper>
		</>
	);
};

export default Home;

const ContentLeftText = styled('div')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.md,
		textAlign: 'right',
		whiteSpace: 'pre-wrap',
		paddingRight: '50px',
		fontWeight: 500,
	};
});
const ContentRightText = styled('div')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.md,
		textAlign: 'left',
		whiteSpace: 'pre-wrap',
		fontWeight: 500,
	};
});

const ContentWrapper = styled('div')`
	width: 100%;
	height: 650px;
	display: flex;
	margin-top: 50px;
	justify-content: center;
	position: relative;
`;

const ContentInner = styled('div')`
	height: 100%;
	display: flex;
	align-items: center;
`;

const BackgroundWrapper = styled('div')`
	position: absolute;
	z-index: -1;
	right: -250px;
	bottom: -20px;
`;

const Image = styled('img')`
	max-width: 600px;
	width: 100%;
	height: 'auto';
`;
