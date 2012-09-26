
Events = {
	build : new Builder(),
	connect: new Connection(),
	clickedRows: [],
	onCloseModal: function (dialog) {
		Events.clickedRows = [];
		$.modal.close(); 
	},
	tableJobSet: function(e){
		var c = $('#table_container'),
			cR = Events.clickedRows;
		e.preventDefault();
		if(e.data!==null){
			for(var i = 0, max = cR.length; i< max; i++){
				if(cR[i] == e.data){
					return false;
				}
			}
			cR.push(e.data);
			var jsonData = Events.connect.getJobs(parseInt(e.data, 10));
			c.append(Events.build.buildTable(jsonData));
		} else {
			var jsonData = Events.connect.getJobs();
			c.empty();
			Events.build.buildTable(jsonData, c);
		}
		c.modal({onClose: Events.onCloseModal});
	}
}
