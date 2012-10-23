$(document).ready(function () {
	var serverEvent = new EventSource('test.php');
	$('#clk2').click(Events.tableJobSet);
	serverEvent.addEventListener('message', function (e) {
		var wind = $('<div id="statusbar"></div>');
		wind.append('Current status of the work: ' + e.data);
		$('body').append(wind);
		wind = $('body').find(wind);
		wind.show();
		wind.animate({
			top: '93%',
			height: '7%'
		}, 400);
		setTimeout(function () {
			wind.hide();
			wind.detach();
		}, 2000);
	}, false);
});