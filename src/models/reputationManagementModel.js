require('dotenv').config();
const mongoose = require('mongoose');

const { DB_COLLECTION_1 } = process.env;

const REPUTATION_MANAGEMENT_SCHEMA = new mongoose.Schema(
	{
		property_id: { type: String, required: true },
		review: { type: String, required: true },
		asqe: {
			type: [{ category_id: String, sentiment: String }],
		},
	},
	{ versionKey: false, timestamps: true },
);

const model = mongoose.model('reputationManagements', REPUTATION_MANAGEMENT_SCHEMA, DB_COLLECTION_1);

module.exports = model;
