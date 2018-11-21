

const xReference = 567636.0;
const yReference = 5949399.0;

const latReference = 53.688921;
const lonReference = 10.024226;

function convertApproximate({x, y}) {
	const dx = xReference - x;
	const dy = yReference - y;
	const latitude = latReference + dx / 100000;
	const longitude = lonReference + dy / 100000;
	return {latitude, longitude};
}

const api = require('./api');
api.queryTable('venue').then(venues => {
	venues.forEach(async v => {
		const converted = convertApproximate(v.location);
		//console.log(converted.latitude + ', ' + converted.longitude);
		const location = {...converted, ...v.location};
		console.log(location);
		await api.patchRecord('venue', v.id, {location});
	});
});
