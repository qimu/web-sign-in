import path from 'path';
import Express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

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

var SIGNINS_FILE = path.join(__dirname, 'signins.json');

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
  fs.readFile(SIGNINS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/signins', function(req, res) {
  fs.readFile(SIGNINS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var signins = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newSignin = {
      date: Date.now(),
      name: req.body.name,
      email: req.body.email
    };
    signins.push(newSignin);
    fs.writeFile(SIGNINS_FILE, JSON.stringify(signins, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(signins);
    });
  });
});




server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});
