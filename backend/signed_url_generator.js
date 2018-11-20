// express is a small HTTP server wrapper, but this works with any HTTP server
const server = require('express')()

const Minio = require('minio');

const client = new Minio.Client({
	endPoint: 'mastercarl.com',
	port: 9000,
	useSSL: false,
	accessKey: '4781AVZGNFHBAOQXC5NL',
	secretKey: 'wv5X1HCBZV4OthWRbgawo4H6HSQGmQ+rElpaac7m'
});

//const url = client.presignedPutObject('default', name);
server.get('/presignedUrl', (req, res) => {

	client.presignedPutObject('default', req.query.name, (err, url) => {
		if (err) throw err
		res.end(url)
	})
})

server.get('/', (req, res) => {
	res.end('online');
})

server.listen(4200);