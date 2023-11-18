/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import { Title } from '../components/common/Title';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	styled,
	tableCellClasses,
} from '@mui/material';
import { useApi } from '../hooks/api/useApi';

const MyCommentList = () => {
	const [commentList, setCommentList] = useState([]);

	const status_kor = status => (status === 1 ? '진행 전' : status === 2 ? '진행 중' : '완료');
	const is_picked_kor = is_picked => (is_picked ? '수락됨' : '');
	const createData = result => {
		const {
			post_created_at,
			post_author,
			post_title,
			post_status,
			comment_is_picked,
			comment_content,
			comment_phone,
			comment_addr,
			comment_detail_addr,
		} = result;
		return {
			created_at: post_created_at,
			author: post_author,
			title: post_title,
			status: status_kor(post_status),
			content: comment_content,
			addr: comment_addr + comment_detail_addr,
			phone: comment_phone,
			is_picked: is_picked_kor(comment_is_picked),
		};
	};

	const { data, isLoading, error, triggerFetch } = useApi('/my-page/comment-list', 'GET');

	useEffect(() => {
		if (data && data.length > 0) {
			setCommentList(data.map(ele => createData(ele)));
		}
	}, [data]);

	useEffect(() => {
		triggerFetch();
	}, []);
	return (
		<Box sx={{ marginBottom: '30px' }}>
			<Title text={'나의 응답 요청'} />
			{error && <span>작성한 응답글이 없어요</span>}
			<TableContainer component={Paper}>
				{!error && data && (
					<Table sx={{ maxWidth: 1160 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>날짜</StyledTableCell>
								<StyledTableCell sx={{ minWidth: 140 }}>작성자</StyledTableCell>
								<StyledTableCell>나눔글 제목</StyledTableCell>
								<StyledTableCell sx={{ minWidth: 140 }}>진행상황</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{commentList.map(row => (
								<Fragment key={row.created_at}>
									<StyledTableRow scope="row">
										<StyledTableCell component="th">{row.created_at}</StyledTableCell>
										<StyledTableCell>{row.author}</StyledTableCell>
										<StyledTableCell>{row.title}</StyledTableCell>
										<StyledTableCell>{row.status}</StyledTableCell>
									</StyledTableRow>
									<StyledTableRow>
										<StyledTableCell></StyledTableCell>
										<StyledTableCell></StyledTableCell>
										<StyledTableCell>
											<Box sx={{ display: 'flex', flexDirection: 'column' }}>
												<p>{row.content}</p>
												<span>전화번호: {row.phone}</span>
												<span>주소: {row.addr}</span>
											</Box>
										</StyledTableCell>
										<StyledTableCell>{row.is_picked}</StyledTableCell>
									</StyledTableRow>
								</Fragment>
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>
		</Box>
	);
};

export default MyCommentList;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.colors.NAVY,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));
