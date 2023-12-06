import { Box } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const SpanWithCopy = ({ type, text }) => {
	const typeToKor = type === 'phone' ? '전화번호' : '주소';
	const onClickCopyButton = e => {
		e.stopPropagation();
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(() => {
				alert(`${typeToKor}가 복사되었습니다.`);
			});
		}
	};
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<div>
				{typeToKor}: {text}
			</div>
			<button onClick={onClickCopyButton}>
				<ContentCopyIcon />
			</button>
		</Box>
	);
};

export default SpanWithCopy;
