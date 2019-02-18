var game = { grid: [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ], winner: '' };
function response_server(something) {
	game['grid'] = something['grid'];
	game['winner'] = something['winner'];
	for (var i = 0; i < game['grid'].length; i++) {
		if (game['grid'][i] === 'O') {
			$('#' + i).text('O');
		}
	}
	console.log(game);
}
function userMove(response_server) {
	$.ajax({
		type: 'POST',
		url: '/ttt/play',
		data: game,
		success: (something) => response_server(something)
	});
}
$('td').click(function() {
	$(this).text('X');
	var id = $(this).attr('id');
	game['grid'][id] = 'X';
	userMove(response_server);
});
