const generate_mock_data = n => {
	let postList = [];
	for (let i = 0; i < n; i++) {
		let post = {
			id: i,
			title: `헌 수건 나눠드려요 ${i}`,
		};
		postList.push(post);
	}
	return postList;
};

export const mock_mypost_list_data = generate_mock_data(25);
