import axios, { AxiosRequestTransformer, InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
	baseURL: 'api',
	withCredentials: true,
});

api.interceptors.request.use(injectCsrftoken)


export class ApiException extends Error { 
}


function injectCsrftoken(config: InternalAxiosRequestConfig) {

	const is_safe = (
		["GET", "HEAD", "OPTIONS", "TRACE"]
			.includes((config.method ?? 'GET').toUpperCase())
	)

	if (!is_safe) {
		const csrftoken = (
			document.cookie
				.split('; ')
				.find(v => v.startsWith('csrftoken='))
				?.replace('csrftoken=', '')
		)

		if (csrftoken) {
			config.headers['X-CSRFToken'] = csrftoken
		}
	}

	return config;
}