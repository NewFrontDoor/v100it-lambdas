import got from 'got';

const BIBLE = 'https://labs.bible.org';

export default async function(passage) {
	try {
		const {body} = await got('api', {
			baseUrl: BIBLE,
			json: true,
			query: {
				passage,
				type: 'json'
			}
		});

		return [null, body];
	} catch (error) {
		return [error];
	}
}
