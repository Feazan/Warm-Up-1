var express = require('express');
var moment = require('moment');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(express.static('controllers'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var name = '';
// var game = { grid: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ], winner: '' };

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/ttt', function(req, res) {
	res.render('ttt', { name: name, moment: moment });
});

app.post('/ttt', function(req, res) {
	var player = req.body.player;
	name = player;
	res.redirect('/ttt');
});

app.post('/ttt/play', function(req, res) {
	console.log('FROM CLIENT', req.body);
	var grid = req.body.grid;
	// Write a function to figure out if someone won

	req.body.winner = 'X';
	// small function to place O in grid
	for (var i = 0; i < grid.length; i++) {
		if (grid[i] === ' ') {
			grid[i] = 'O';
			break;
		}
	}
	// send updated grid back
	console.log('SEND BACK', req.body);
	res.status(200).send(req.body);
});

// Start the Server
app.listen(3000, function() {
	console.log('Server Started...');
});
