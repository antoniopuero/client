/** @namespace */
Events = {
	build : new Builder({
		formId: 'form_container',
		tableId: 'table_container',
		treeId: 'tree'
	}),
	connect: new Connection({
		jobInfo: "/server-proc/job.php",
		newJob: "/server-proc/new_job.php",
		eventSource: "/server-proc/test.php"
	}),
	table: [],
	clickedRows: [],
	checkedRows: [],
	/**tableJobSet calls when we're about to create table of jobs.
	*@method tableJobSet
	*@param {eventObject} e Contains all needed information.
	*@param {number|string} id Indentifier of some job[set].
	*/
	tableJobSet: function (e, id) {
		"use strict";
		var self = Events,
			tableC = $('#' + self.build.tableId),
			jsonData,
			cR = self.clickedRows,
			i,
			max = cR.length;
		e.preventDefault();
		tableC.empty();
		tableC.append('<div id="action_menu"></div>');
		id = e.data || id;
		if ((id !== null) && (id !== undefined)) {
			for (i = 0; i < max; i += 1) {
				if (cR[i] === id) {
					return false;
				}
			}
			cR.push(id);
			jsonData = self.connect.getJobs(parseInt(id, 10));
			self.table = self.build.buildTable(jsonData, tableC);//now table is dom elem
		} else {
			jsonData = self.connect.getJobs();
			self.table = self.build.buildTable(jsonData, tableC);
		}
		tableC.show();
	},
	/**treeSet calls when we're about to create tree of jobs.
	*@method treeSet
	*@param {DOM Object} tree DOM Object fetched by jQuery.
	*/
	treeSet: function (tree) {
		"use strict";
		var self = this;
		tree = self.build.buildTree(self.connect.getJobsTree(), tree);
		tree.bind('select_node.jstree', function (event, data) {
			var target = data.rslt.obj.find('a');//a contains all information, which we added in build proccess
			if (target.hasClass('jobset')) {
				self.tableJobSet(event, target.attr('id'));
			} else if (target.hasClass('workflow')) {
				//console.log('workflow');
			}
		});
	},
	formConstruct: function (container) {
		"use strict";
		var jsonData = this.connect.send();
		Events.build.buildForm(jsonData, container);
		container.show();
	}
};
/*-------------------------------constant handlers--------------------------------*/
$(document).ready(function () {
	"use strict";
	var formC = $('#' + Events.build.formId),
		tableC = $('#' + Events.build.tableId),
		serverEvent = new EventSource(Events.connect.eventSource),
		keyFlag = true,
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
	serverEvent.addEventListener('message', function (e) {
		var wind = $('<div id="statusbar"></div>');
		wind.append('Current status of the work: ' + e.data);
		$('#container_wrapper').append(wind);
		wind = $('#container_wrapper').find(wind);
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
	Events.formConstruct(formC);
	formC.delegate('.int', 'keypress', function (e) {
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
	formC.delegate('.float', 'keypress', function (e) {
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
	formC.delegate('.send_button', 'click', function (e) {
		e.preventDefault();
		console.log(Events.build.getJSON($('#new_project')));
	});
	tableC.delegate('#check_all', 'change', function (e) {
		var elems = $('.row_checkers'),
			container = $('#action_menu'),
			i,
			max = elems.length;
		/*if (e.target.checked) {
			boolFlag = true;
		} else {
			boolFlag = false;
		}
		for (max = elems.length; i < max; i += 1) {
			elems[i].checked = boolFlag;
		}*/
		Events.checkedRows = [];
		if (e.target.checked) {
			for (i = 0; i < max; i += 1) {
				Events.checkedRows.push(parseInt($(elems[i]).val().substr(6), 10));
			}
			elems.attr('checked', true);
			Events.build.destroyActionMenu(container);
			Events.build.buildActionMenu(container);
		} else {
			Events.checkedRows = [];
			elems.attr('checked', false);
			Events.build.destroyActionMenu(container);
		}
	});
	tableC.delegate('.row_checkers', 'change', function (e) {
		var elems = $('.row_checkers'),
			container = $('#action_menu'),
			boolFlag;
		boolFlag = Array.prototype.some.call(elems, function (elem) {
			return (elem.checked === true);
		});
		if (e.target.checked) {
			if (boolFlag) {
				Events.build.destroyActionMenu(container);
			}
			Events.checkedRows.push(parseInt(e.target.value.substr(6), 10));
			if (Events.checkedRows.length >= 2) {
				Events.build.buildActionMenu(container);
			}
		} else {
			Events.checkedRows = Events.checkedRows.filter(function (value, key) {
				return value !== parseInt(e.target.value.substr(6), 10);
			});
			if (Events.checkedRows.length <= 2) {
				Events.build.destroyActionMenu(container);
			}
		}
	});
	tableC.delegate('#action_menu a.row_delete', 'click', function (e) {
		var length = Events.checkedRows.length,
			i,
			pos;
		e.preventDefault();
		for (i = 0; i < length; i += 1) {
			pos = Events.table.fnGetPosition($('tr#' + Events.checkedRows[i]).get(0));
			Events.table.fnDeleteRow(pos);
		}
		$('#check_all').attr('checked', false);
		Events.build.destroyActionMenu($('#action_menu'));
		Events.checkedRows = [];
	});
	tableC.delegate('tr div a.row_delete', 'click', function (e) {
		var self = $(this),
			pos;
		pos = Events.table.fnGetPosition($('tr#' + self.parent().attr('id').substr(9)).get(0));
		Events.table.fnDeleteRow(pos);
		Events.checkedRows = Events.checkedRows.filter(function (value, key) {
			return value !== parseInt(self.parent().attr('id').substr(9), 10);
		});
		if (Events.checkedRows.length <= 2) {
			Events.build.destroyActionMenu($('#action_menu'));
		}
	});
	Events.treeSet($('#' + Events.build.treeId));
});