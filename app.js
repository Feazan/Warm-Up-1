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
var winCondition = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ]
];

function determineWinner(grid) {
	var str = '';

	for (var i = 0; i < winCondition.length; i++) {
		if (
			grid[winCondition[i][0]] === grid[winCondition[i][1]] &&
			grid[winCondition[i][0]] === grid[winCondition[i][2]] &&
			grid[winCondition[i][2]] !== ' '
		) {
			str = grid[winCondition[i][0]];
			break;
		}
	}
	return str;
}

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/ttt', function(req, res) {
	console.log(name);
	res.render('form');
});

app.post('/ttt', function(req, res) {
	var player = req.body.player;
	name = player;
	res.render('ttt', { name: name, moment: moment });
	// res.redirect('/ttt');
});

app.post('/ttt/play', function(req, res) {
	console.log('FROM CLIENT', req.body);
	var grid = req.body.grid;
	// small function to place O in grid
	for (var i = 0; i < grid.length; i++) {
		if (grid[i] === ' ') {
			grid[i] = 'O';
			break;
		}
	}
	// Function to determine winner
	req.body.winner = determineWinner(req.body.grid);
	// send updated grid back
	console.log('SEND BACK', req.body);
	res.status(200).send(req.body);
});

// Start the Server
app.listen(3000, function() {
	console.log('Server Started...');
});
