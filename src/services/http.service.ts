import { HttpError } from '@/lib/customErrors.errors';

async function fetchData(
	url: string,
	options?: RequestInit
): Promise<{
	error: null | unknown;
	data: null | Response;
}> {
	try {
		const res = await fetch(url, options);

		if (!res.ok) throw new HttpError({ status: res.status });

		return { error: null, data: res };
	} catch (error) {
		return { error, data: null };
	}
}

function get(url: string) {
	return fetchData(url);
}

function post(url: string, options?: RequestInit) {
	return fetchData(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(options?.body),
		credentials: 'include',
		...options,
	});
}

export default {
	get,
	post,
};
