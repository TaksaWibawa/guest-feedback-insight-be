function convertLowercase(str) {
	if (typeof str !== 'string' || !str) return str;
	return str.toLowerCase();
}

module.exports = convertLowercase;
