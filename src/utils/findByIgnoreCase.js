function findByIgnoreCase(value) {
	if (!value || typeof value !== 'string') return false;

	const regex = new RegExp(`^${value}$`, 'i');
	return { $regex: regex };
}

module.exports = findByIgnoreCase;
