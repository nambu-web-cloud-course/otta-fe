import { useMemo, useState } from 'react';
import { Title } from '../components/common/Title';
import { TextField, Button, lighten, styled, Box, Paper } from '@mui/material';
import DragAndDropZone from '../components/createPost/DragAndDropZone';
import { useNavigateTo } from '../routes/navigate';
import theme from '../styles/theme';
import client from '../hooks/api/client';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '../components/createPost/ImageList';

export default function CreatePost() {
	const goTo = useNavigateTo();
	const [post, setPost] = useState({});
	const [imageInfo, setImageInfo] = useState([]);
	const [trySubmit, setTrySubMit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const isTitleEmpty = useMemo(
		() => trySubmit && (!post.title || post.title.length === 0),
		[post.title, trySubmit],
	);
	const isContentEmpty = useMemo(
		() => trySubmit && (!post.content || post.content.length === 0),
		[post.content, trySubmit],
	);
	const isImageEmpty = useMemo(() => trySubmit && imageInfo.length === 0, [imageInfo, trySubmit]);

	const onUploadImage = async fileInfo => {
		if (imageInfo.length === 5) {
			alert('이미지는 5장까지만 첨부 가능해요');
		} else {
			setImageInfo([...imageInfo, { file: fileInfo, url: URL.createObjectURL(fileInfo) }]);
		}
	};

	const onChangeTextField = async e => {
		const { name, value } = e.target;
		setPost(post => ({ ...post, [name]: value }));
	};

	const onDeleteImage = deletedIdx => {
		setImageInfo(prev => prev.filter((_, idx) => idx !== deletedIdx));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setTrySubMit(true);
		if (isTitleEmpty || isContentEmpty || isImageEmpty) {
			alert('업로드 조건을 만족하지 못했어요. 다시 한 번 확인해주세요.');
			return;
		}

		setIsLoading(true);
		try {
			const { data } = await client.post('/nanum-create-post', post);
			const { post_id } = data.data;

			const formData = new FormData();
			imageInfo.forEach(image => {
				formData.append('files', image.file, image.file.name);
			});

			const { data: storage_url_list } = await client.post('/upload/images', formData, {
				headers: {
					'Content-Type': 'multipart/form-data;',
				},
				timeout: 30000,
			});

			await client.post('/nanum-create-post/image', {
				post_id: post_id,
				image_url_list: storage_url_list.data,
			});

			setIsLoading(false);
			goTo(`/nanum/detail?postId=${post_id}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancel = () => {
		goTo('/nanum/list');
	};

	return (
		<>
			{isLoading && (
				<Paper
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'rgba(217, 217, 217, 0.46)',
						zIndex: 10,
					}}
				>
					<CircularProgress />
				</Paper>
			)}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					marginLeft: '120px',
					marginRight: '120px',
					marginBottom: '20px',
				}}
			>
				<Title text={'나눔 게시글 작성'} />
				<TextField
					sx={{ mb: 5 }}
					type="text"
					name="title"
					fullWidth
					value={post.title ?? ''}
					label="제목"
					variant="standard"
					onChange={onChangeTextField}
					error={isTitleEmpty}
					id={isTitleEmpty ? 'outlined-error-helper-text' : ''}
					helperText="필수 입력 항목이에요"
				/>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						gap: '60px',
						minWidth: 1000,
						minHeight: '590px',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '570px',
							textAlign: 'left',
						}}
					>
						<SubTitle>기부 내용</SubTitle>
						<TextField
							sx={{ border: theme.colors.DARK_GRAY, width: '100%' }}
							type="text"
							name="content"
							placeholder="<작성 가이드>&#13;&#10;글에는 옷의 사이즈, 옷의 유형, 사용감 등 자세하게 알려주세요.&#13;&#10;첨부 이미지는 1장 필수 업로드 해주세요."
							variant="outlined"
							multiline
							value={post.content ?? ''}
							rows={22}
							onChange={onChangeTextField}
							error={isContentEmpty}
							id={isContentEmpty ? 'outlined-error-helper-text' : ''}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'left',
							justifyContent: 'space-between',
						}}
					>
						<Box sx={{ width: '100%' }}>
							<SubTitle>첨부 이미지</SubTitle>
							<DragAndDropZone onFileUpload={onUploadImage} />
							<ImageList imageInfo={imageInfo} onDeleteImage={onDeleteImage} />
						</Box>
						<Box>
							<SubmitButton sx={{ mt: 5 }} onClick={handleSubmit}>
								글 작성 완료하기
							</SubmitButton>
							<CancelButton sx={{ mt: 2 }} onClick={handleCancel}>
								글 작성 취소하기
							</CancelButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}

const SubmitButton = styled(Button)(({ theme }) => {
	return {
		width: '100%',
		height: '42px',
		color: theme.colors.WHITE,
		fontSize: theme.font_sizes.xs,
		fontWeight: 'bold',
		backgroundColor: theme.colors.DARK_YELLOW,
		'&:hover': {
			backgroundColor: lighten(theme.colors.DARK_YELLOW, 0.3),
		},
	};
});

const CancelButton = styled(Button)(({ theme }) => {
	return {
		width: '100%',
		height: '42px',
		color: theme.colors.WHITE,
		fontSize: theme.font_sizes.xs,
		fontWeight: 'bold',
		backgroundColor: theme.colors.DARK_GRAY,
		'&:hover': {
			backgroundColor: lighten(theme.colors.DARK_GRAY, 0.3),
		},
	};
});

const SubTitle = styled('span')(({ theme }) => {
	return {
		fontSize: theme.font_sizes.sm,
		fontWeight: 'bold',
		textAlign: 'left',
	};
});
