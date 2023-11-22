import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../common/CustomButton';

const ImageList = ({ imageInfo, onDeleteImage }) => {
	return (
		<div
			style={{
				marginTop: '16px',
				width: '590px',
				display: 'flex',
				gap: '10px',
			}}
		>
			{imageInfo.map((image, idx) => (
				<div
					key={`${image.file.name}-${image.url}`}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '10px',
					}}
				>
					<img
						src={image.url}
						alt={`${image.url}-${idx}`}
						width="110px"
						height="110px"
						style={{
							objectFit: 'cover',
							borderRadius: '10px',
							boxShadow:
								'0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
						}}
					/>

					<CustomButton
						width={36}
						height={28}
						fontSize={'xs'}
						color={'DARK_ORANGE'}
						textColor={'WHITE'}
						text={<DeleteIcon />}
						onClick={() => onDeleteImage(idx)}
					/>
				</div>
			))}
		</div>
	);
};

export default ImageList;
