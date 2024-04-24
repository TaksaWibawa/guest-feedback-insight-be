/* eslint-disable import/no-dynamic-require */
const admin = require('firebase-admin');
const client = require('firebase/auth');

const { firebaseAuth } = require('../configs/configFirebase');

const serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

class ServiceAuth {
  constructor() {
    this.admin = admin;
    this.client = client;
  }

  async init() {
    this.admin.initializeApp({
      credential: this.admin.credential.cert(serviceAccount),
    });
  }

  async login({ email, password }) {
    try {
      const { user } = await this.client.signInWithEmailAndPassword(firebaseAuth, email, password);

      const accessToken = await user.getIdToken();

      return { accessToken };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUserViaEmail({ email, password, displayName, phoneNumber }) {
    try {
      const photoURL = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
        displayName
      )}`;

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

  async getUserData(token) {
    try {
      const decodedToken = await this.verifyToken(token);
      const { uid } = decodedToken;
      const user = await this.admin.auth().getUser(uid);
      const dbData = await this.admin.firestore().collection('users').doc(uid).get();

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        otaUrls: dbData.data().otaUrls,
      };
    } catch (error) {
      return null;
    }
  }

  async verifyToken(token) {
    try {
      const decodedToken = await this.admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ServiceAuth;
