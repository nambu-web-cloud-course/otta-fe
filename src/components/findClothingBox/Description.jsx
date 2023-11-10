import { styled } from '@mui/material';
import React from 'react';

const Description = ({ text }) => {
	return <Span>{text}</Span>;
};

export default Description;

const Span = styled('span')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.sm,
		textAlign: 'center',
	};
});
