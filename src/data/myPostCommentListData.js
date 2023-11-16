const generateMockData = n => {
	const data = [];
	for (let i = 0; i < n; i++) {
		let post = {
			id: i,
			post_id: 2,
			title: '저에게 꼭 필요한 수건이에요',
			user_id: Math.floor(Math.random() * 5),
			created_at: '2023-11-07 16:21:10',
			content:
				'저에게 코트를 주세요 제발요~!  저에게 코트를 주세요 제발요~! 저에게 코트를 주세요 제발요~! ',
			phone: '01012345678',
			addr: '서울특별시 금천구 독산로50길 23',
			addr_detail: '본관 1층',
			is_picked: false,
			is_clicked: false,
		};
		data.push(post);
	}
	return data;
};

export const mock_mypost_comment_list_data = generateMockData(5);
