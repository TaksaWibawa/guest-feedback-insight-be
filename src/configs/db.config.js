const mongoose = require("mongoose");
require("dotenv").config();

const APP_NAME = process.env.APP_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_CLUSTER = process.env.DB_CLUSTER;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority&appname=${APP_NAME}`;

async function connectDB() {
	try {
		await mongoose.connect(url);
		console.log("Connected to the database, ", url);
	} catch (error) {
		console.error("Error connecting to the database: ", error);
	}
}

module.exports = { connectDB };
