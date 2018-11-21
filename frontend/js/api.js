const axios = require('axios');

async function queryTable(table, params) {
	if (params) {
		params = '?' + params;
	} else {
		params = ''
	}
	try {
		const response = await axios.get(`http://mastercarl.com:3000/${table}${params}`);
		return response.data;
	} catch (e) {
		console.error(e);
	}
}

async function addRecord(table, record) {
	return await axios.post(`http://mastercarl.com:3000/${table}`, record).catch(console.error);
}

async function patchRecord(table, id, record) {
	return await axios.patch(`http://mastercarl.com:3000/${table}?id=eq.${id}`, record).catch(console.error);
}

function createContent(type, venue, picture_url, text, location) {
	return addRecord(
			'venue_content',
			{type, venue, picture_url, text, location}
		);
}

const createIssue = createContent.bind(this, 'issue');

function addCommentToIssue(issueId, comment, author) {
	return addRecord('comment', {referenced: issueId, comment, author});
}

async function getContentForVenue(id) {
	const content = await queryTable('venue_content', `venue=eq.${id}`);
	const grouped = content.reduce(function (r, c) {
		r[c.type] = r[c.type] || [];
		r[c.type].push(c);
		return r;
	}, Object.create(null));
	return grouped;
}

async function uploadFile(name, data) {
	const res = await axios.get(`http://mastercarl.com:4200/presignedUrl?name=${name}`);
	const url = res.data;
	console.log('uploading to signed url', url);
	await axios.put(url, data);
	console.log('upload succeeded');
	return `http://mastercarl.com:9000/default/${name}`;
}

async function getVenuesByCategory() {
	const content = await queryTable('venue');
	const grouped = content.reduce(function (r, c) {
		r[c.type] = r[c.type] || [];
		r[c.type].push(c);
		return r;
	}, Object.create(null));
	return grouped;
}
//uploadFile('test', require('fs').readFileSync('test.txt')).then(console.log);

async function starVenue(id, starred) {
	return await patchRecord('venue', id, {starred});
}

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}


module.exports = {queryTable, addRecord, uploadFile, getContentForVenue, createIssue, createContent, makeid, starVenue, getVenuesByCategory};