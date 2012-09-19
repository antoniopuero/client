$(document).ready(function(){


	var c = $('#form_container');
	$('#clk1').click(function(e){
		var jsonData = (new Connection()).send();
		e.preventDefault();
		c.append((new Builder()).buildForm(jsonData));
		c.arcticmodal();
	})
	$('#clk2').click((new Builder()).handlers.tableJobSet);
});