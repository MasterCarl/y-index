const axios = require('axios');

async function queryTable(table, arguments) {
	try {
		const response = await axios.get(`http://mastercarl.com:3000/${table}${arguments || ''}`);
		return response.data;
	} catch (e) {
		console.error(e);
	}
}

async function addRecord(table, record) {
	return await axios.post(`http://mastercarl.com:3000/${table}`, record).catch(console.error);
}

module.exports = {queryTable, addRecord};

//queryTable('venue').then(console.log);

// issue relating to

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
	const content = await queryTable('venue_content', `?venue=eq.${id}`);
	const grouped = content.reduce(function (r, c) {
		r[c.type] = r[c.type] || [];
		r[c.type].push(c);
		return r;
	}, Object.create(null));
	return grouped;
}

async function uploadFile(name, data) {
	const Minio = require('minio');

	const client = new Minio.Client({
		endPoint: 'mastercarl.com',
		port: 9000,
		useSSL: false,
		accessKey: '4781AVZGNFHBAOQXC5NL',
		secretKey: 'wv5X1HCBZV4OthWRbgawo4H6HSQGmQ+rElpaac7m'
	});

	const url = await client.presignedPutObject('default', name);

	await axios.put(url, data);
	return 'http://mastercarl.com:9000/default/' + name;
}

uploadFile('test', require('fs').readFileSync('/Users/carl/Developer/hackathons/y-index/backend/api.js')).then(console.log);