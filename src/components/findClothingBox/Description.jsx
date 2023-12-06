import { styled } from '@mui/material';

const Description = ({ text }) => {
	return <Span>{text}</Span>;
};

export default Description;

const Span = styled('span')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.sm,
		textAlign: 'center',
		whiteSpace: 'pre-wrap',
	};
});
