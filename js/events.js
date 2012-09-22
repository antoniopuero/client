Events = {

	clickedRows: [],
	onCloseModal: function (dialog) {
		Events.clickedRows = [];
		$.modal.close(); 
	},
	tableJobSet: function(e){
		var c = $('#table_container'),
			cR = Events.clickedRows;
		if(e.data!==null){
			for(var i = 0, max = cR.length; i< max; i++){
				if(cR[i] == e.data){
					return false;
				}
			}
			cR.push(e.data);
			console.log(cR);
			console.log('if');
			var jsonData = (new Connection()).getJobs(parseInt(e.data, 10));
			e.preventDefault();
			c.append((new Builder()).buildTable(jsonData));
		} else {
			console.log('else');
			var jsonData = (new Connection()).getJobs(parseInt(e.data, 10));
			e.preventDefault();
			c.empty().append((new Builder()).buildTable(jsonData));
		}
		c.modal({onClose: Events.onCloseModal});
	}
}