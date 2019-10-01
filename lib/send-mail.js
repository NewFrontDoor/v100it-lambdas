export default async function(transporter, data) {
	try {
		const info = await transporter.sendMail(data);

		console.log(info);

		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			body: ''
		};

		return [null, response];
	} catch (error) {
		return [error];
	}
}
