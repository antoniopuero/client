
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
		if(e.data!==null){
			for(var i = 0, max = cR.length; i< max; i++){
				if(cR[i] == e.data){
					return false;
				}
			}
			cR.push(e.data);
			console.log(cR);
			console.log('if');
			var jsonData = Events.connect.getJobs(parseInt(e.data, 10));
			e.preventDefault();
			c.append(Events.build.buildTable(jsonData));
		} else {
			console.log('else');
			var jsonData = Events.connect.getJobs();
			e.preventDefault();
			c.empty();
			Events.build.buildTable(jsonData, c);
		}
		c.modal({onClose: Events.onCloseModal});
	}
}
