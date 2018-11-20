const api = require('./api');

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


processCsv('/Users/carl/Downloads/OpenDataNorderstedt/Daten/01_Schulen.csv',
	csvrow => api.addRecord('venue', {
		type: 'school',
		name: csvrow.BEZEICH,
		address: csvrow.LAGE,
		city: csvrow.ORT,
		type_detail: csvrow.SCHULTYP,
		location: {x: csvrow.X, y: csvrow.Y}
	}).catch(console.error)
);

processCsv('/Users/carl/Downloads/OpenDataNorderstedt/Daten/02_Kitas.csv',
	csvrow => api.addRecord('venue', {
		type: 'kita',
		name: csvrow.BEZEICH,
		address: csvrow.LAGE,
		city: csvrow.ORT,
		location: {x: csvrow.X, y: csvrow.Y}
	}).catch(console.error)
);