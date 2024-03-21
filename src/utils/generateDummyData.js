const mongoose = require('mongoose');
const model = require('../models/modelSentimentAnalytics');

function generateDummyData() {
	const categories = ['Location', 'Service', 'Pricing', 'Room', 'Amenities', 'Atmosphere', 'Food', 'General'];
	const subCategories = ['A', 'B', 'C', 'D', 'E'];
	const data = [];

	categories.forEach((category) => {
		let trend;
		const randomValue = Math.random() * (1 - 0) + 0;

		if (randomValue === 0.5) {
			trend = 'Neutral';
		} else if (randomValue > 0.5) {
			trend = 'Positive';
		} else {
			trend = 'Negative';
		}
		const mentions = Math.floor(Math.random() * (200 - 50 + 1) + 50);
		let positive;
		let negative;
		let neutral;
		let sentimentScore;

		if (trend === 'Positive') {
			positive = Math.floor(Math.random() * (mentions - mentions / 2 + 1) + mentions / 2);
			negative = mentions - positive;
			neutral = 0;
			sentimentScore = Math.random() * (1 - 0.5) + 0.5; // sentiment score between 0.5 and 1
		} else if (trend === 'Negative') {
			negative = Math.floor(Math.random() * (mentions - mentions / 2 + 1) + mentions / 2);
			positive = mentions - negative;
			neutral = 0;
			sentimentScore = Math.random() * (0.5 - 0) + 0; // sentiment score between 0 and 0.5
		} else {
			neutral = mentions;
			positive = 0;
			negative = 0;
			sentimentScore = 0.5;
		}

		const subItems = subCategories.map((subCategory) => ({
			category: subCategory,
			sentimentScore: parseFloat(sentimentScore.toFixed(2)),
			trend,
			mentions,
			positive,
			negative,
			neutral,
		}));

		data.push({
			category,
			sentimentScore: parseFloat(sentimentScore.toFixed(2)),
			trend,
			mentions,
			positive,
			negative,
			neutral,
			items: subItems,
		});
	});

	return data;
}

async function insertDummyData() {
	try {
		const db = mongoose.connection;
		const collectionName = 'analyticsSentimentCategories';
		const collection = db.collections[collectionName];

		if (collection) {
			await db.dropCollection(collectionName);
		}

		const dummyData = generateDummyData();
		await model.insertMany(dummyData);
		db.close();
	} catch (error) {
		console.error('Error inserting dummy data:', error);
	}
}

module.exports = { insertDummyData };
