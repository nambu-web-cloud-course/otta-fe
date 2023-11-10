import styled from '@emotion/styled';
import React from 'react';

export const Title = ({ text }) => {
	return <H1>{text}</H1>;
};

const H1 = styled.h1`
	font-weight: bold;
`;
