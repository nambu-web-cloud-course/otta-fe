import React, { useState } from 'react';
import { Title } from '../components/common/Title';
import { TextField, Grid, Button, lighten, styled } from '@mui/material';

export default function CreatePost() {
	const [post, setPost] = useState({});
	const [imgs, setImgs] = useState([]);

	const handleChange = e => {
		const { name, value, files } = e.target;
		console.log('name', name, 'value', value, 'files', files);
		if (name === 'file') {
			console.log('files[0]', files[0]);
			// setImgs([...imgs, files && files[0]]);
			setImgs([...imgs, files && URL.createObjectURL(files[0])]);
			console.log(URL.createObjectURL(files[0]));
			return;
		}
		setPost(post => ({ ...post, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<section>
			<Title text={'나눔 게시글 작성'} />

			<Addform onSubmit={handleSubmit}>
				<TextField
					sx={{ mb: 5 }}
					type="text"
					name="title"
					required
					value={post.title ?? ''}
					label="제목"
					fullWidth
					variant="standard"
					onChange={handleChange}
				/>
				{imgs &&
					imgs.map(image => {
						return <img key={image.id} src={image} alt="image" width="200px" />;
					})}
				{/* {imgs && <img src={URL.createObjectURL(imgs)} alt="image" width="200px" />} */}

				{/* {imgs &&
					imgs.forEach(image => {
						<img src={URL.createObjectURL(image)} alt="image" width="200px" />;
					})} */}
				<Grid container sx={{ mt: 5 }}>
					<Grid item xs>
						<ContentTextField
							name="content"
							label="내용을 입력하세요"
							multiline
							variant="filled"
							value={post.content ?? ''}
							required
							rows={15}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						<TextField type="file" accept="image/*" name="file" required onChange={handleChange} />

						<SignUpButton variant="contained" fullWidth sx={{ mt: 5 }}>
							글 작성 완료하기
						</SignUpButton>
						<SignUpButton variant="contained" fullWidth sx={{ mt: 2 }}>
							글 작성 취소하기
						</SignUpButton>
					</Grid>
				</Grid>
			</Addform>
		</section>
	);
}

const SignUpButton = styled(Button)(({ theme }) => ({
	mb: 5,
	mt: 5,
	color: theme.colors.WHITE,
	fontSize: theme.font_sizes.sm,
	fontWeight: 'bold',
	backgroundColor: theme.colors.DARK_YELLOW,
	'&:hover': {
		backgroundColor: lighten(theme.colors.DARK_YELLOW, 0.3),
	},
}));
const Addform = styled('form')`
	width: 150%;
	margin-left: -25%;
`;
const ContentTextField = styled(TextField)`
	width: 100%;
`;
