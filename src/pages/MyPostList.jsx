/* eslint-disable no-unused-vars */
import { createRef, forwardRef, memo, useState } from 'react';
import { Title } from '../components/common/Title';
import { FixedSizeList, VariableSizeList, areEqual } from 'react-window';
import {
	Box,
	Button,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
} from '@mui/material';
import { mock_mypost_list_data } from '../data/myPostListData';
import memoize from 'memoize-one';
import { mock_mypost_comment_list_data } from '../data/myPostCommentListData';

import NotesIcon from '@mui/icons-material/Notes';
import SendIcon from '@mui/icons-material/Send';
import { useMemo } from 'react';
import SpanWithCopy from '../components/myPostList/SpanWithCopy';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';

const GAP_SIZE = 10;
const PARCEL_CJ_URL = 'https://www.cjlogistics.com/ko/tool/parcel/reservation-general';
const PARCEL_LOTTE_URL = 'https://www.lotteglogis.com/mobile/reservation/delivery/index';

const PostRow = memo(({ data, index, style }) => {
	const navigate = useNavigate();
	const { items, clickPost } = data;
	const { id, title } = items[index];

	const onClickListItem = () => {
		clickPost();
	};

	const onClickGoToPost = e => {
		e.stopPropagation();
		navigate(`/nanum/detail?postId=${id}`);
	};

	return (
		<ListItem
			style={{
				...style,
				top: `${style.top + GAP_SIZE}px`,
				height: `${style.height - GAP_SIZE}px`,
				background: '#EDEDED',
			}}
			key={index}
			component="div"
			disablePadding
		>
			<ListItemButton onClick={onClickListItem}>
				<ListItemIcon>
					<NotesIcon />
				</ListItemIcon>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<ListItemText primary={`${title}`} />
					<ListItemText onClick={onClickGoToPost} primary={'게시글 상세보기'} />
				</Box>
			</ListItemButton>
		</ListItem>
	);
}, areEqual);

PostRow.displayName = 'PostRow';

const CommentRow = memo(({ data, index, style }) => {
	const { items, clickComment, clickCommentCheck } = data;

	const {
		id,
		title,
		user_id,
		created_at,
		content,
		phone,
		addr,
		addr_detail,
		is_picked,
		is_clicked,
	} = items[index];

	const onClickListItem = () => {
		clickComment({ id: id });
	};

	const onClickCommentCheck = e => {
		e.stopPropagation();
		if (confirm('요청을 수락하시겠어요? 한 번 수락하면 취소할 수 없어요,')) {
			clickCommentCheck({ id: id });
		}
	};

	const onClickOpenNewTab = url => {
		window.open(url, '_blank', 'noopener, noreferrer');
	};

	return (
		<ListItem
			style={{
				...style,
				top: `${style.top + GAP_SIZE}px`,
				height: `${style.height - GAP_SIZE}px`,
				background: `${is_picked ? theme.colors.DARK_YELLOW : theme.colors.BEIGE}`,
			}}
			key={index}
			component="div"
			disablePadding
		>
			<ListItemButton
				onClick={onClickListItem}
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
			>
				<Box sx={{ display: 'flex', width: '100%' }}>
					<ListItemIcon sx={{ display: 'flex', paddingTop: '10px' }}>
						<SendIcon />
					</ListItemIcon>
					<ListItemText
						sx={{ fontWeight: 'bold' }}
						primary={`${title}`}
						secondary={!is_clicked ? '응답 상세보기' : ' '}
					/>
					<ListItemText sx={{ textAlign: 'right' }}>{created_at}</ListItemText>
				</Box>

				{is_clicked && (
					<Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '56px', gap: '12px' }}>
						<CommentUserId>{user_id}</CommentUserId>
						<div>{content}</div>
						<SpanWithCopy type="phone" text={phone} />
						<SpanWithCopy type="address" text={`${addr} ${addr_detail}`} />
						{!is_picked && <Button onClick={onClickCommentCheck}>요청 수락</Button>}
						{is_picked && (
							<>
								<div>이미 수락된 응답이에요</div>
								<Button onClick={() => onClickOpenNewTab(PARCEL_CJ_URL)}>
									CJ 대한 통운 택배 예약
								</Button>
								<Button onClick={() => onClickOpenNewTab(PARCEL_LOTTE_URL)}>롯데 택배 예약</Button>
							</>
						)}
					</Box>
				)}
			</ListItemButton>
		</ListItem>
	);
}, areEqual);

CommentRow.displayName = 'CommentRow';

const createPostData = memoize((items, clickPost) => ({
	items,
	clickPost,
}));

const createCommentData = memoize((items, clickComment, clickCommentCheck) => ({
	items,
	clickComment,
	clickCommentCheck,
}));

const MyPostList = () => {
	const [postList, setPostList] = useState(mock_mypost_list_data);
	const [commentList, setCommentList] = useState([]);

	const commentRef = createRef();

	const onClickPost = () => {
		setCommentList(mock_mypost_comment_list_data);
		commentRef.current.resetAfterIndex(0);
	};

	const onClickComment = data => {
		const setCommentIsClicked = commentList.map(ele => {
			if (ele.id === data.id) {
				return { ...ele, is_clicked: true };
			}
			return { ...ele, is_clicked: false };
		});
		setCommentList(setCommentIsClicked);
		commentRef.current.resetAfterIndex(0);
	};

	const onClickCommentCheck = data => {
		const setCommentCheckIsClicked = commentList.map(ele => {
			if (ele.id === data.id) {
				return { ...ele, is_picked: true };
			}
			return ele;
		});
		setCommentList(setCommentCheckIsClicked);
		commentRef.current.resetAfterIndex(0);
	};

	const clickedComment = useMemo(() => {
		return commentList.filter(ele => ele.is_clicked).map(ele => ele.id)[0];
	}, [commentList]);

	const postData = createPostData(postList, onClickPost);
	const commentData = createCommentData(commentList, onClickComment, onClickCommentCheck);

	const getItemSize = idx => {
		return idx === clickedComment ? 350 : 90;
	};

	return (
		<div>
			<Title text={'작성한 나눔글'} />
			<Box component={'section'} sx={{ display: 'flex' }}>
				<FixedSizeList
					height={600}
					width={500}
					itemSize={90}
					innerElementType={innerElementType}
					itemCount={postList.length}
					overscanCount={5}
					itemData={postData}
				>
					{PostRow}
				</FixedSizeList>

				<VariableSizeList
					ref={commentRef}
					height={600}
					width={500}
					itemSize={getItemSize}
					innerElementType={innerElementType}
					itemCount={commentList.length}
					overscanCount={5}
					itemData={commentData}
				>
					{CommentRow}
				</VariableSizeList>
			</Box>
		</div>
	);
};

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
	<div
		ref={ref}
		style={{
			...style,
			width: `${parseFloat(style.width) + GAP_SIZE}px`,
			paddingLeft: GAP_SIZE,
			paddingTop: GAP_SIZE,
		}}
		{...rest}
	/>
));

innerElementType.displayName = 'PostRowInnerType';

export default MyPostList;

const CommentUserId = styled('span')(({ theme }) => ({
	fontSize: theme.font_sizes.sm,
	fontWeight: 'bold',
	color: theme.colors.NAVY,

	width: '100%',
	display: 'flex',
	justifyContent: 'end',
}));
