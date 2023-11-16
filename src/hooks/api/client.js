import axios from 'axios';

const logOnDev = (message, color) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(`%c${message}`, `color: ${color}`);
	}
};

const onRequest = config => {
	const { method, url } = config;
	logOnDev(`👕 [API] ${method?.toUpperCase()} ${url} | onRequest`, 'blue');
	return config;
};

const onResponse = response => {
	const { method, url } = response.config;
	const { status } = response;

	logOnDev(`👕 [API] ${method?.toUpperCase()} ${url} | Response ${status}`, 'green');
	return response;
};

const onErrorResponse = error => {
	if (axios.isAxiosError(error)) {
		const { message } = error;
		const { method, url } = error.config;
		let status, statusText;
		if (error.response) {
			status = error.response.status;
			statusText = error.response.statusText;
		}

		logOnDev(
			`🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`,
			'red',
		);
	}
	return Promise.reject(error);
};

const client = axios.create({
	baseURL: process.env.REACT_APP_SERVER,
	headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use(config => onRequest(config));

client.interceptors.response.use(
	config => onResponse(config),
	error => onErrorResponse(error),
);

export default client;
