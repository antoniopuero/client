$(document).ready(function () {
	var serverEvent = new EventSource('test.php');
	$('#clk1').click(function (e) {
		var c = $('#form_container'),
			jsonData = Events.connect.send();
		e.preventDefault();
		c.html('').append(Events.build.buildForm(jsonData));
		c.modal();
	});
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