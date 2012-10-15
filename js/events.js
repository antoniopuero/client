/** @namespace */
Events = {
	build : new Builder({
		formC: $('#form_container'),
		tableC: $('#table_container'),
		treeC: $('#tree')
	}),
	connect: new Connection(),
	clickedRows: [],
	/**onCloseModal calls when modal window is about to close.
	*@method onCloseModal
	* @param {eventObject} dialog Contains all needed information.
	*/
	onCloseModal: function (dialog) {
		Events.clickedRows = [];
		$.modal.close();
	},
	/**tableJobSet calls when we're about to create table of jobs.
	*@method tableJobSet
	*@param {eventObject} e Contains all needed information.
	*@param {number|string} id Indentifier of some job[set].
	*/
	tableJobSet: function (e, id) {
		var self = Events,
			tableC = $('#table_container'),
			jsonData,
			cR = self.clickedRows,
			i,
			max = cR.length;
		tableC.empty();
		e.preventDefault();
		id = e.data || id;
		console.log(id);
		if ((id !== null) && (id !== undefined)) {
			console.log('if');
			for (i = 0; i < max; i++) {
				if (cR[i] === id) {
					return false;
				}
			}
			cR.push(id);
			jsonData = self.connect.getJobs(parseInt(id, 10));
			tableC.append(self.build.buildTable(jsonData));
		} else {
			console.log('else');
			jsonData = self.connect.getJobs();
			self.build.buildTable(jsonData, tableC);
		}
		tableC.modal({onClose: self.onCloseModal});
	},
	/**treeSet calls when we're about to create tree of jobs.
	*@method treeSet
	*@param {DOM Object} tree DOM Object fetched by jQuery.
	*/
	treeSet: function (tree) {
		var self = this;
		tree = self.build.buildTree(self.connect.getJobsTree(), tree);
		tree.bind('select_node.jstree', function (event, data) {
			var target = data.rslt.obj.find('a');//a contains all information, which we added in build proccess
			if (target.hasClass('jobset')) {
				console.log('set');
				self.tableJobSet(event, target.attr('id'));
			} else if (target.hasClass('workflow')) {
				console.log('workflow');
			}
		});
	}
};
/*-------------------------------constant handlers--------------------------------*/
$(document).ready(function () {
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
		},
		prop;
	$('#form_container').delegate('.int', 'keypress', function (e) {
		keyFlag = true;
		ctrlKey = true;
		for (prop in keyNames) {
			if ((e.keyCode === keyNames[prop])) {//for Firefox!!!
				keyFlag = false;
			}
		}
		if (e.ctrlKey && (
				(e.which === 97)//ctrl+a
				|| (e.which === 99)//ctrl+c
				|| (e.which === 118)//ctrl+v
				|| (e.which === 120)//ctrl+x
			)) {
			ctrlKey = false;
		}
		if (ctrlKey && keyFlag && ((e.which < 48) || (e.which > 57))) {
			return false;
		}
	});
	$('#form_container').delegate('.float', 'keypress', function (e) {
		var prop;
		keyFlag = true;
		ctrlKey = true;
		for (prop in keyNames) {
			if (e.keyCode === keyNames[prop]) { // for Firefox!
				keyFlag = false;
			}
		}
		if (e.ctrlKey && (
				(e.which === 97)//ctrl+a
				|| (e.which === 99)//ctrl+c
				|| (e.which === 118)//ctrl+v
				|| (e.which === 120)//ctrl+x
			)) {
			ctrlKey = false;
		}
		if ((ctrlKey && keyFlag && (
				(e.which < 46)
				|| (e.which > 57)
				|| (e.which === 47)
			))
				|| (($(this).val().match(/\./)) && (e.which === 46))
				) {
			return false;
		}
	});
	$('#form_container').delegate('#send', 'click', function (e) {
		e.preventDefault();
		console.log(Events.build.getJSON($('#new_project')));
		$('.modalCloseImg').trigger('click');
	});
	Events.treeSet($('#tree'));
});