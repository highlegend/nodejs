const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const saveData = async () => {
	const response = await axios.get(
		`https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_API_KEY}&nutrition-type=cooking`,
		{
			headers: {
				Accept: 'application/json',
			},
		}
	);

	fs.writeFile('frontend/static/js/views/aliments.json', JSON.stringify(response.data), (error) => {
		if (!error) {
			console.log('Data saved successfully in frontend/static/js/views/aliments.json');
		} else {
			console.log(error);
		}
	});
};

app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(8080, async () => {
	await saveData();
	console.log('server running...');
});
