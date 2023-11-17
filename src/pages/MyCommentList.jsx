/* eslint-disable no-unused-vars */
import { useState } from 'react';
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

	const rows = [
		createData({
			post_id: 0,
			post_created_at: '2023-11-15 17:45:10',
			post_author: '옷장 마스터',
			post_title: '레이스 달린 커튼이나 옷 구합니다',
			post_status: 2,
			comment_is_picked: true,
			comment_content:
				'저에게 꼭 필요한 코트입니다.\n제가 가지고 있는 옷과 딱 매치가 될 것 같아요.\n추워지는 날씨에 맞춰 제가 새 주인이 되어 보고 싶습니다.\n예쁘게 입으신 옷 저도 잘 관리하며 입을게요',
			comment_phone: '01012345678',
			comment_addr: '서울특별시 금천구 독산로50길 23',
			comment_detail_addr: '본관 1층',
		}),
		createData({
			post_id: 0,
			post_created_at: '2023-11-15 17:45:10',
			post_author: '옷장 마스터',
			post_title: '레이스 달린 커튼이나 옷 구합니다',
			post_status: 1,
			comment_is_picked: false,
			comment_content:
				'저에게 꼭 필요한 코트입니다.\n제가 가지고 있는 옷과 딱 매치가 될 것 같아요.\n추워지는 날씨에 맞춰 제가 새 주인이 되어 보고 싶습니다.\n예쁘게 입으신 옷 저도 잘 관리하며 입을게요',
			comment_phone: '01012345678',
			comment_addr: '서울특별시 금천구 독산로50길 23',
			comment_detail_addr: '본관 1층',
		}),
	];
	return (
		<div>
			<Title text={'나의 응답 요청'} />
			<TableContainer component={Paper}>
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
						{rows.map(row => (
							<>
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
							</>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
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
