const generateMockData = n => {
	const data = [];
	for (let i = 0; i < n; i++) {
		let post = {
			id: i,
			title: '헌 수건 나눠드려요',
			user_id: Math.floor(Math.random() * 10),
			created_at: '2023-11-07 16:21:10',
			content: '깨끗하게 썼는데, 그래도 필요하신 분이 있을까 하여 나눔합니다. 많이 신청해주세요.',
			status: Math.floor(Math.random() * 3) + 1,
			thumbnail: 'https://picsum.photos/360/200',
			isMyPost: !(Math.floor(Math.random() * 2) === 1),
		};
		data.push(post);
	}
	return data;
};

export const mock_nanum_list_data = generateMockData(10);
