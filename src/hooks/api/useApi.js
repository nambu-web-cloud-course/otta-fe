import { useEffect, useState } from 'react';
import client from './client';

/**
 *
 * @param {*} url : api 엔드포인트
 * @param {*} method : api method
 * @param {*} options : params, body
 * @returns {data, isLoading, error, triggerFetch}
 * @example const { data, isLoading, error, triggerFetch }
 * = useApi('/find-clothing-box/addr', 'GET', {
 * params: { district: searchQuery, region: '보라매동' },
 * });
 */
export const useApi = (url, method, options) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isFetch, setIsFetch] = useState(false);

	const triggerFetch = () => setIsFetch(true);

	const fetchData = async () => {
		setIsLoading(true);

		try {
			if (method === 'GET') {
				const response = await client.get(url, options);
				setData(response.data);
			} else if (method === 'POST') {
				const response = await client.post(url, options);
				setData(response.data);
			} else if (method === 'PUT') {
				const response = await client.put(url, options);
				setData(response.data);
			} else if (method === 'DELETE') {
				const response = await client.delete(url, options);
				setData(response.data);
			}
		} catch (error) {
			setError(error);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (isFetch) {
			fetchData();
			setIsFetch(false);
		}
	}, [isFetch]);

	return { data, isLoading, error, triggerFetch };
};
