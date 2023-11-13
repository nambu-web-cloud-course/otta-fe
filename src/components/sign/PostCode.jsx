import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import './post.css';

const PostCode = props => {
	const complete = data => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}
		console.log(data);
		console.log(fullAddress);
		console.log(data.zonecode);

		props.setAddress({
			...props.address,
			address: fullAddress,
		});
	};

	return (
		<div>
			<DaumPostcode className="postmodal" autoClose onComplete={complete} />
		</div>
	);
};

export default PostCode;
