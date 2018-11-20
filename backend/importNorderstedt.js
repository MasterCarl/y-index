const db = require('./db');

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