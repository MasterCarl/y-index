const config = {
		apiKey: "AIzaSyBhYzu_CdyEBXBwiuo76xZqg7KplwaGIAc",
		authDomain: "y-index.firebaseapp.com",
		databaseURL: "https://y-index.firebaseio.com",
		projectId: "y-index",
		storageBucket: "y-index.appspot.com",
		messagingSenderId: "574153494400"
};

const admin = require('firebase-admin');

const serviceAccount = require('./y-index-firebase-adminsdk.json');

admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const fs = require('fs');
const parse = require('csv-parse');

function processCsv(path, processRecord) {

	const csvData=[];

	fs.createReadStream(path)
		.pipe(parse({delimiter: ';', columns: true,}))
		.on('data', processRecord)
		.on('end',function() {
			//do something with csvData
			console.log(csvData);
		});
}

/*
const schools = db.collection('schools');
processCsv('/Users/carl/Downloads/OpenDataNorderstedt/Daten/01_Schulen.csv',
	csvrow => schools.doc(csvrow.IDENT).set({
		name: csvrow.BEZEICH,
		address: csvrow.LAGE,
		city: csvrow.ORT,
		type: csvrow.SCHULTYP,
		location: {x: csvrow.X, y: csvrow.Y}
	})
);
*/