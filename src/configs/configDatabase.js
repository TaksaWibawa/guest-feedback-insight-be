const mongoose = require('mongoose');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME, APP_NAME } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority&appname=${APP_NAME}`;

async function connectDB() {
	try {
		await mongoose.connect(url);
		console.log('Connected to the database, ', url);
	} catch (error) {
		console.error('Error connecting to the database: ', error);
		process.exit(1);
	}
}

module.exports = { connectDB };
