/* eslint-disable import/no-dynamic-require */
const admin = require('firebase-admin');

const serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

class ServiceAuth {
	constructor() {
		this.admin = admin;
	}

	async init() {
		this.admin.initializeApp({
			credential: this.admin.credential.cert(serviceAccount),
		});
	}

	async createUserViaEmail({ email, password, displayName, phoneNumber }) {
		try {
			const photoURL = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(displayName)}`;
			const user = await this.admin.auth().createUser({
				email,
				emailVerified: false,
				phoneNumber,
				password,
				displayName,
				photoURL,
				disabled: false,
			});
			return user;
		} catch (err) {
			throw new Error(err);
		}
	}

	async verifyToken(token) {
		try {
			const decodedToken = await this.admin.auth().verifyIdToken(token);
			return decodedToken;
		} catch (error) {
			return null;
		}
	}

	// TODO: add method for: getNewToken, getUserData, updateUser, deleteUser, etc.
}

module.exports = ServiceAuth;
