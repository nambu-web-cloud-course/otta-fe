/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, lighten } from '@mui/material';
import theme from '../../styles/theme';

/**
 * Description placeholder
 * @example
 * <CustomButton
		width={80}
		height={44}
		fontSize={'xs'}
		color={'WHITE'}
		textColor={'NAVY'}
		text={'로그인'}
		/>
 */
const CustomButton = ({ width, height, fontSize, color, textColor, text, onClick }) => {
	const customCSS = css({
		width: `${width}px`,
		height: `${height}px`,
		fontSize: theme.font_sizes[fontSize],
		fontWeight: 'bold',
		color: theme.colors[textColor],
		background: theme.colors[color],
		'&:hover': {
			background: lighten(theme.colors[color], 0.3),
		},
	});
	return (
		<Button onClick={onClick} css={customCSS}>
			{text}
		</Button>
	);
};

export default CustomButton;
