import { styled } from '@mui/material';
import React from 'react';

const HOME_IMAGE_URL = [
	`${process.env.REACT_APP_BLOB_IMAGE}/Tip-01.png`,
	`${process.env.REACT_APP_BLOB_IMAGE}/Tip-02-01.png`,
	`${process.env.REACT_APP_BLOB_IMAGE}/Tip-03.png`,
	`${process.env.REACT_APP_BLOB_IMAGE}/Tip-01.png`,
];

const TipForClothes = () => {
	return (
		<>
			<ContentWrapper>
				<ContentInner>
					<ContentTitle>의류 배출 시 주의사항</ContentTitle>
					<LeftTextWrapper>
						<ContentSubTitle>빨래통 분리</ContentSubTitle>
						<p>
							플라스틱, 금속 등의 비섬유성 소재가 포함된 의류는
							{'\n'}
							플라스틱류와 분리하여 배출해야 합니다.
						</p>
						<ContentSubTitle>화학물질 제거</ContentSubTitle>
						<p>
							사용한 의류에는 화학물질이 남아있을 수 있으므로, {'\n'}
							가능한한 세탁 후 배출하고, 특히 가연성 물질은 주의해야 합니다.
						</p>
						<ContentSubTitle>플라스틱 태그 제거</ContentSubTitle>
						<p>
							의류에 부착된 플라스틱 태그는 제거한 후, {'\n'}
							플라스틱류로 분리하여 처리해야 합니다.
						</p>
					</LeftTextWrapper>
				</ContentInner>
				<ContentInner>
					<Image src={HOME_IMAGE_URL[0]} alt="의류 배출법 팁 첫 이미지" />
				</ContentInner>
			</ContentWrapper>
			<ContentWrapper>
				<ContentInner>
					<Image src={HOME_IMAGE_URL[1]} alt="의류 배출법 팁 두번째 이미지" />
				</ContentInner>
				<ContentInner>
					<ContentTitle>의류 수거함에 배출하면 안 되는 품목</ContentTitle>
					<RightTextWrapper>
						<ContentSubTitle>신발 및 액세서리</ContentSubTitle>
						<p>
							신발, 벨트, 모자 등의 액세서리는
							{'\n'}기타 재활용 수거함에 배출해야 합니다.{'\n'}
						</p>
						<ContentSubTitle>가죽제품</ContentSubTitle>
						<p>
							가죽 소재의 의류나 액세서리는{'\n'}
							가죽류 수거함에 배출해야 합니다.{'\n'}
						</p>
						<ContentSubTitle>불량 의류</ContentSubTitle>
						<p>
							찢어진, 오염된, 또는 사용이 어려운 불량 의류는{'\n'}
							일반 쓰레기통에 배출해야 합니다.
						</p>
					</RightTextWrapper>
				</ContentInner>
			</ContentWrapper>
			<ContentWrapper>
				<ContentInner>
					<ContentTitle>기타 활용 방법 및 팁</ContentTitle>
					<LeftTextWrapper>
						<ContentSubTitle>의류 기부</ContentSubTitle>
						<p>
							더 이상 입지 않는 의류 중 입기 무리가 없는 것은{'\n'}
							기부하여 다른 이들에게 도움을 줄 수 있습니다.
						</p>
						<ContentSubTitle>브랜드 재활용 프로그램 참여</ContentSubTitle>
						<p>
							몇몇 의류 브랜드와 상점은{'\n'} 의류 재활용 프로그램을 운영하고 있으니,{'\n'}
							해당 프로그램에 참여하여 의류를 재활용하세요.
						</p>
						<ContentSubTitle>업사이클링 DIY 프로젝트</ContentSubTitle>
						<p>
							오래된 의류를 활용하여{'\n'} 가방, 액세서리, 또는 패션 소품을 만들어보는{'\n'}
							업사이클링 DIY 프로젝트에 참여해보세요.
						</p>
					</LeftTextWrapper>
				</ContentInner>
				<ContentInner>
					<Image src={HOME_IMAGE_URL[2]} alt="의류 배출법 팁 세번째 이미지" />
				</ContentInner>
			</ContentWrapper>
		</>
	);
};

export default TipForClothes;

const ContentTitle = styled('span')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.md,
		textAlign: 'center',
		whiteSpace: 'pre-wrap',
		fontWeight: 700,
		marginBottom: '30px',
	};
});

const LeftTextWrapper = styled('div')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.base,
		textAlign: 'right',
		whiteSpace: 'pre-wrap',
		paddingRight: '30px',
		fontWeight: 500,
		paddingBottom: '30px',
	};
});

const RightTextWrapper = styled('div')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.base,
		textAlign: 'left',
		whiteSpace: 'pre-wrap',
		paddingLeft: '30px',
		fontWeight: 500,
		paddingBottom: '30px',
	};
});

const ContentSubTitle = styled('span')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.base,
		whiteSpace: 'pre-wrap',
		fontWeight: 800,
		marginBottom: '15px',
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
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`;

const Image = styled('img')`
	max-width: 600px;
	width: 100%;
	height: 'auto';
`;
