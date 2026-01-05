const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const httpClient = async (
	path: string,
	options: RequestInit = {},
	baseUrl: string = API_BASE_URL,
): Promise<Response> => {
	const apiKey = import.meta.env.VITE_API_KEY; // TODO: implement token swtitching logic
	const response = await fetch(`${baseUrl}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey,
			...options.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`API Error: ${response.status} ${response.statusText}`);
	}

	return response;
};
