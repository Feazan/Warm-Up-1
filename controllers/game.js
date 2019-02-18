const gridClient = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ];
function response_server(something) {
	for (var i = 0; i < something['grid'].length; i++) {
		if (something['grid'][i] === 'O') {
			$('#' + i).text('O');
		}
	}
	if (something['winner'] !== '') {
		$('#winnerField').text('Winner: ' + something['winner'] + ' is the winner!');
	}
	console.log(something);
}

$('td').click(function() {
	$(this).text('X');
	var id = $(this).attr('id');
	gridClient[id] = 'X';
	$.ajax({
		type: 'POST',
		url: '/ttt/play',
		dataType: 'json',
		data: JSON.stringify({
			grid: gridClient
		}),
		contentType: 'application/json',
		success: (something) => response_server(something)
	});
});
