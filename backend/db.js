// const config = {
// 		apiKey: "AIzaSyBhYzu_CdyEBXBwiuo76xZqg7KplwaGIAc",
// 		authDomain: "y-index.firebaseapp.com",
// 		databaseURL: "https://y-index.firebaseio.com",
// 		projectId: "y-index",
// 		storageBucket: "y-index.appspot.com",
// 		messagingSenderId: "574153494400"
// };

const admin = require('firebase-admin');

const serviceAccount = require('./y-index-firebase-adminsdk.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

module.exports = db;