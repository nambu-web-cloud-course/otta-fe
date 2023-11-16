/* eslint-disable no-unused-vars */
import { forwardRef, memo, useState } from 'react';
import { Title } from '../components/common/Title';
import { FixedSizeList, areEqual } from 'react-window';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { mock_mypost_list_data } from '../data/myPostListData';
import memoize from 'memoize-one';
import { mock_mypost_comment_list_data } from '../data/myPostCommentListData';

import NotesIcon from '@mui/icons-material/Notes';
import SendIcon from '@mui/icons-material/Send';
import theme from '../styles/theme';
import { useMemo } from 'react';

const GAP_SIZE = 10;

const PostRow = memo(({ data, index, style }) => {
	const { items, clickPost } = data;
	const { id, title } = items[index];

	const onClickListItem = () => {
		clickPost();
	};

	return (
		<ListItem
			style={{
				...style,
				left: `${style.left + GAP_SIZE}px`,
				top: `${style.top + GAP_SIZE}px`,
				width: `${style.width - GAP_SIZE}px`,
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
				<ListItemText primary={`${title}`} secondary={'게시글 상세보기'} />
			</ListItemButton>
		</ListItem>
	);
}, areEqual);

PostRow.displayName = 'PostRow';

const CommentRow = memo(({ data, index, style }) => {
	const { items, clickComment } = data;

	const {
		id,
		post_id,
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

	const listHeight = is_clicked ? style.height - GAP_SIZE + 50 : style.height - GAP_SIZE;

	return (
		<ListItem
			style={{
				...style,
				left: `${style.left + GAP_SIZE}px`,
				top: `${style.top + GAP_SIZE}px`,
				width: `${style.width - GAP_SIZE}px`,
				height: `${listHeight}px`,
				background: '#EDEDED',
			}}
			key={index}
			component="div"
			disablePadding
		>
			<ListItemButton onClick={onClickListItem}>
				<ListItemIcon>
					<SendIcon />
				</ListItemIcon>
				<ListItemText primary={`${title}`} secondary={'응답 상세보기'} />
				<div>{created_at}</div>
				{is_clicked && (
					<>
						<div>{user_id}</div>
						<div>{content}</div>
						<div>전화번호: {phone}</div>
						<div>
							주소: {addr} {addr_detail}
						</div>
						<button>요청 수락</button>
					</>
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

const createCommentData = memoize((items, clickComment) => ({
	items,
	clickComment,
}));

const MyPostList = () => {
	const [postList, setPostList] = useState(mock_mypost_list_data);
	const [commentList, setCommentList] = useState([]);
	const [selectedComment, setSelectedComment] = useState(null);

	const onClickPost = () => {
		setCommentList(mock_mypost_comment_list_data);
	};

	const onClickComment = data => {
		const setCommentIsClicked = commentList.map(ele => {
			if (ele.id === data.id) {
				setSelectedComment(ele.id);
				return { ...ele, is_clicked: true };
			}
			return { ...ele, is_clicked: false };
		});
		setCommentList(setCommentIsClicked);
	};

	const postData = createPostData(postList, onClickPost);

	const commentData = createCommentData(commentList, onClickComment, false);
	console.log('commentData: ', commentData);

	const getItemSize = index => {
		// if (index === selectedComment) return 150;
		return 70;
	};
	return (
		<div>
			<Title text={'작성한 나눔글'} />
			<Box component={'section'} sx={{ display: 'flex' }}>
				<FixedSizeList
					height={400}
					width={360}
					itemSize={70}
					innerElementType={innerElementType}
					itemCount={postList.length}
					overscanCount={5}
					itemData={postData}
				>
					{PostRow}
				</FixedSizeList>
				<FixedSizeList
					height={400}
					width={360}
					itemSize={getItemSize}
					innerElementType={innerElementType}
					itemCount={commentList.length}
					overscanCount={5}
					itemData={commentData}
				>
					{CommentRow}
				</FixedSizeList>
			</Box>
		</div>
	);
};

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
	<div
		ref={ref}
		style={{
			...style,
			paddingLeft: GAP_SIZE,
			paddingTop: GAP_SIZE,
		}}
		{...rest}
	/>
));

innerElementType.displayName = 'PostRowInnerType';

export default MyPostList;
