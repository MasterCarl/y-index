const db = require('./db');

// issue relating to
function createIssue(id, title, comments = []) {
	const doc = db.collection('issues').doc(id);
	doc.set({title, comments});
}

function addCommentToIssue(issueId, comment) {
	const docRef = db.collection('issues').doc(issueId);
	docRef.get().then(doc => {
		const comments = doc.data().comments;
		comments.push(comment);
		docRef.update({comments});
	});
}

function addIssueToVenue(issueRef, venueRef) {
	const venue = db.collection('issues').doc(issueId);
	docRef.get().then(doc => {
		const comments = doc.data().comments;
		comments.push(comment);
		docRef.update({comments});
	});
}

async function getIssue(id) {
	const docRef = db.collection('issues').doc(id);
	const doc = await docRef.get();
	return doc.data();
}

function createReport(venueRef, imageData, text, authorRef) {
	const reports = db.collection('reports');
	let image = null;
	if (imageData) {
		image = uploadFile(imageData);
	}
	reports.add({
		image, text, author: authorRef
	});
	if (venueRef) {

	}
}

function uploadFile(data) {
	// TODO
}
//createIssue('test', 'test', ['first comment']);
//addCommentToIssue('test', 'second comment');

getIssue('test').then(console.log);