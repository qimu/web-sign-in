import path from 'path';
import Express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
var mongourl = process.env["MONGODB_URI"];
var db;

// mongodb
var MongoClient = require('mongodb').MongoClient,
  co = require('co'),
  assert = require('assert');

// connect to the mongodb server
co(function*() {
  // Use connect method to connect to the Server
  db = yield MongoClient.connect(mongourl);

  // Close the connection
  //db.close();
}).catch(function(err) {
  console.log(err.stack);
});

// configure express
var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var server;

// serve static files
const PATH_STYLES = path.resolve(__dirname, '../client/styles');
const PATH_DIST = path.resolve(__dirname, '../../dist');

app.use('/styles', Express.static(PATH_STYLES));
app.use(Express.static(PATH_DIST));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// APIs

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/signins', function(req, res) {
	Promise.coroutine(function *() {
		try {
			var docs = yield db.collection('signins').find().toArray();
			res.json(docs);
		} catch (err) {
			res.status(404).send({error:"Error", err});
		}
	})();
});

app.post('/api/signins', function(req, res) {
	Promise.coroutine(function *() {
		try {
			var newSignin = {
				date: Date.now(),
				name: req.body.name,
				email: req.body.email
			};
			yield db.collection('signins').insertOne(newSignin);
			res.json(newSignin);
		} catch (err) {
			res.status(404).send({error:"Error", err});
		}
	})();
});


server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;
  console.log('Server is listening at %s', port);
});
