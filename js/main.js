$(document).ready(function(){


	var c = $('#form_container');
	$('#clk1').click(function(e){
		var jsonData = (new Connection()).send();
		e.preventDefault();
		c.html('').append((new Builder()).buildForm(jsonData));
		c.modal();
	})
	$('#clk2').click(Events.tableJobSet);
});