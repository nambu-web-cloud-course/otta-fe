/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';

const { kakao } = window;

const KakaoMap = ({ x, y }) => {
	useEffect(() => {
		const mapContainer = document.getElementById('kakao-map');
		const mapOption = {
			center: new kakao.maps.LatLng(y, x),
			level: 3,
		};
		const kakaoMap = new kakao.maps.Map(mapContainer, mapOption);

		const markerPosition = new kakao.maps.LatLng(y, x);

		const marker = new kakao.maps.Marker({
			position: markerPosition,
		});

		marker.setMap(kakaoMap);
	}, [x, y]);

	return <MapWrapper id="kakao-map" />;
};

export default KakaoMap;

const MapWrapper = styled('div')(() => {
	return {
		width: '400px',
		height: '500px',
	};
});
