import { styled } from '@mui/material/styles';
import React from 'react';

export const Title = ({ text }) => {
	return <H1>{text}</H1>;
};

const H1 = styled('h1')(({ theme }) => {
	return {
		fontWeight: 'bold',
		fontSize: theme.font_sizes.lg,
		textAlign: 'center',
	};
});
