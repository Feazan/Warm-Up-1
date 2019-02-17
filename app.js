var express = require('express');
var moment = require('moment');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var name = '';
var game = { grid: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ], winner: '' };

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/ttt', function(req, res) {
	res.render('ttt', { name: name, moment: moment, game: game });
});

app.post('/ttt', function(req, res) {
	var player = req.body.player;
	name = player;
	res.redirect('/ttt');
});

app.post('/ttt/play', function(req, res) {
	console.log(req.body.grid);
	// Write a function to figure out if someone won
	// small function to place O in grid
	// send variable back instead of hello
	res.status(200).send('Hello');
});

/**
 * if req.url === '/api/ninjas'
 * var ninjas = {[name: 'ryu', age: 29]};
 * res.writeHead(200, {'Content-Type': 'application/json'});
 * res.end(JSON.stringify(ninjas));
 */

app.listen(3000, function() {
	console.log('Server Started...');
});
