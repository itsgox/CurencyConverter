export async function fetchApi(endpoint, json, options) {

	let data = null;
	const domain = options?.domain || process.env.VERCEL_PROJECT_PRODUCTION_URL;

	try {
		data = await fetch(`${domain ? `https://${domain}` : 'http://localhost:3000'}/api${endpoint}`, {
			method: json ? 'POST' : options?.method || 'GET',
			headers: {
				'content-type': 'application/json'
			},
			body: !json ? undefined : JSON.stringify(json),
			cache: 'no-cache'
		});
		data = await data.json();
	}
	catch (err) { data = null; }

	return data;
}