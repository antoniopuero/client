
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
	},
	treeExample: function(){
		var tree = $('#tree');
		this.build.buildTree(this.connect.getJobs(), tree);
	}
}
/*-------------------------------Handlers--------------------------------*/
$(document).ready(function(){
	var keyFlag = true,
		ctrlKey = true,
		keyNames = {
			'TAB': 9,
		    'ENTER': 13,
		    'BACKSPACE': 8,
		    'CTRL': 17,
		    'ALT': 18,
		    'LEFT': 37,
		    'RIGHT': 39
		};
	$('#form_container').delegate('.int','keypress', function(e){
		keyFlag = true;
		ctrlKey =true;
		for(var prop in keyNames){
			if((e.keyCode == keyNames[prop])){//for Firefox!!!
				keyFlag = false;
			}
		}
		if(e.ctrlKey&&(
				(e.which === 97)//ctrl+a
				||(e.which === 99)//ctrl+c
				||(e.which === 118)//ctrl+v
				||(e.which === 120)//ctrl+x
				)){
			ctrlKey = false;
		}
		if(ctrlKey&&keyFlag&&((e.which<48)||(e.which>57))){
			return false;
		} 
	})
	$('#form_container').delegate('.float','keypress', function(e){
		keyFlag = true;
		ctrlKey =true;
		for(var prop in keyNames){
			if(e.keyCode == keyNames[prop]){ // for Firefox!
				keyFlag = false;
			}
		}
		if(e.ctrlKey&&(
				(e.which === 97)//ctrl+a
				||(e.which === 99)//ctrl+c
				||(e.which === 118)//ctrl+v
				||(e.which === 120)//ctrl+x
				)){
			ctrlKey = false;
		}
		if( ctrlKey
			&&keyFlag
			&&((e.which<46)
			||(e.which>57)
			||(e.which === 47))
			||(($(this).val().match(/\./))&&(e.which === 46))){
			return false;
		}
	})
	$('#form_container').delegate('#send','click', function(e){
		e.preventDefault();
		console.log(Events.build.getJSON($('#new_project')));
		$('.modalCloseImg').trigger('click');
	})
	Events.treeExample();
})