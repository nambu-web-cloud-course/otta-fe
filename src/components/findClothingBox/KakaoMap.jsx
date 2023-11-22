/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';

const { kakao } = window;

const KakaoMap = ({ defaultX, defaultY, x, y, triggerPing }) => {
	const [kakaoMap, setKakaoMap] = useState(null);

	const setCenter = (map, x, y) => {
		const moveLatLon = new kakao.maps.LatLng(y, x);
		// 지도 중심을 이동 시킵니다
		map && map.setCenter(moveLatLon);
	};

	const refreshMarker = marker => {
		marker.setMap(null);
	};

	useEffect(() => {
		setCenter(kakaoMap, x, y);
		const markerPosition = new kakao.maps.LatLng(y, x);

		const marker = new kakao.maps.Marker({
			position: markerPosition,
		});
		// marker.setMap(null);
		marker.setMap(kakaoMap);
	}, [triggerPing]);

	const markerCurrentPosition = (map, currentX, currentY) => {
		//TODO: 이미지 바꾸기
		const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다
		const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
		const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

		const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
		const markerPosition = new kakao.maps.LatLng(currentY, currentX); // 마커가 표시될 위치입니다

		let marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImage,
		});
		marker.setMap(map);
	};

	useEffect(() => {
		const mapContainer = document.getElementById('kakao-map');
		const mapOption = {
			center: new kakao.maps.LatLng(defaultY, defaultX),
			level: 3,
		};
		const map = new kakao.maps.Map(mapContainer, mapOption);
		markerCurrentPosition(map, defaultX, defaultY);
		setKakaoMap(map);
	}, [defaultX, defaultY]);

	return <MapWrapper id="kakao-map" />;
};

export default KakaoMap;

const MapWrapper = styled('div')(() => {
	return {
		width: '400px',
		height: '500px',
	};
});
