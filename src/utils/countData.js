async function countData(model) {
	if (!model) return 0;
	if (typeof model === 'function') return model.countDocuments().exec();
	return Array.isArray(model) ? model.length : Object.keys(model).length;
}

module.exports = countData;
