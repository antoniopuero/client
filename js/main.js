$(document).ready(function(){
	$('#clk1').click(function(e){
		var c = $('#form_container');
		var jsonData = Events.connect.send();
		e.preventDefault();
		c.html('').append(Events.build.buildForm(jsonData));
		c.modal();
	})

	$('#clk2').click(Events.tableJobSet);

	$('#table_container').delegate('a', 'click', function(){
		var self = $(this);
		{
			Events.build.addEventToSetRow(self);
			console.log('fggd');
		}
	})

});
