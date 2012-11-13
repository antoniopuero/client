/**
*@constructor
*/
function Builder(config) {
	"use strict";
	this.formC = config.formC;
	this.tableC = config.tableC;
	this.treeC = config.treeC;
}
Builder.prototype = {
	firstLetter: function (word) {
		"use strict";
		return word.substr(0, 1).toUpperCase() + word.substr(1);
	},
	buildActionMenu: function (node) {
		"use strict";
		node.prepend($('<a href="#" class="row_do row_delete"></a><a href="#" class="row_do row_stop"></a><a href="#" class="row_do row_start"></a>'))
	},
	destroyActionMenu: function (node) {
		"use strict";
		node.find('a').detach();
	},
	/**
	*buildForm a simple form, which helps user to init new job.
	*@method buildForm
	*@param {Object} config all data with types from server, which user need to init new job.
	*@param {undefined|DOM Object} container Optional argument for recursive calling of builForm for different types and tabs of data.
	*@returns {DOM Object} form Builded form 
	*/
	buildForm: function (config, container) {
		"use strict";
		var fragment = $('<form id ="new_project" name="data" method="post"></form>'),
			tabsMenu = $('<div id="tabs"></div>'),
			count = 1,
			i = 0,
			element,
			prop,
			self = fragment;
		if (container) {
			self = container;
		}
		for (prop in config) {
			if ((typeof config[prop] === 'object') && (config[prop].tabName)) {
				if (count === 1) {
					tabsMenu.append($('<ul class = "tabs"></ul><div class="panes"></div>'));
				}
				tabsMenu.find('.tabs').append($('<li><a href="#tabs-' + count + '">' + config[prop].tabName + '</a></li>'));
				tabsMenu.find('.panes').append($('<div id = "tabs-' + count + '"></div>'));
				this.buildForm(config[prop], tabsMenu.find('#tabs-' + count));
				count += 1;
				self.append(tabsMenu);
			} else if ((config[prop] === 'int') || (config[prop] === 'float') || (config[prop] === 'string')) {
				element =  $('<p>' + this.firstLetter(prop.toString()) + '</p><input type="text" name="' + prop + '" class="' + config[prop] + ' input" size="40">');
				self.append(element);
			} else if (config[prop] === 'bool') {
				element =  $('<p>' + this.firstLetter(prop.toString()) + '</p><span>True:</span><input type="radio" name="' + prop + '" class="booltrue"><span>False:</span><input type="radio" name="' + prop + '" class="boolfalse">');
				self.append(element);
			} else if (config[prop] === 'blob') {
				element =  $('<p>' + this.firstLetter(prop.toString()) + '</p><textarea name="' + prop + '" class="blob input" cols="30" rows="15">');
				self.append(element);
			} else if (config[prop].type === 'list_check') {
				element =  $('<fieldset class="checklist" name="' + prop + '"></fieldset>');
				element.append($('<legend>' + this.firstLetter(prop.toString()) + '</legend>'));
				i = 0;
				while (config[prop][i] !== undefined) {
					element.append($('<p><input type="checkbox" name="' + config[prop][i] + '" class="list_checks">' + config[prop][i] + '</p>'));
					i += 1;
				}
				self.append(element);
			} else if (config[prop].type === 'list_option') {
				element =  $('<select class="optionlist" multiple="multiple" name="' + prop + '"></select>');
				i = 0;
				while (config[prop][i] !== undefined) {
					element.append($('<option value="' + config[prop][i] + '" class="list_option">' + config[prop][i] + '</option>'));
					i += 1;
				}
				self.append('<p>' + this.firstLetter(prop.toString()) + '</p><p>Use ctrl key to multiple select</p>').append(element);
			}
		}
		self.find('ul.tabs').tabs('div.panes > div');
		if (!container) {
			self.append($('<button class="send_button">Send</button>'));
			return self;
		}
	},
	addErrorMsq: function (elem, msg) {
		"use strict";
		elem.after($('<span class="error_message">' + msg + '</span>'));
	},
	delErrorMsg: function (form) {
		form.find('.error_message').detach();
	},
	/**
	*getJSON for right conversion of form data to JSON format.
	*@method getJSON
	*@param {DOM Object} formObject DOM fragment with form with inputed data.
	*@returns {JSON string} json which we send back to the server.
	*/
	getJSON: function (formObject) {
		"use strict";
		var self = this,
			json = {},
			underElems,
			error,
			checkerCount = 0,
			i = 0,
			max = 0;
		self.delErrorMsg(formObject);
		$.each(formObject.get(0).elements, function (key, elem) {
			elem = $(elem);
			if (elem.hasClass('checklist')) {
				underElems = elem.find('input');
				json[elem.attr('name')] = '';
				for (i = 0, max = underElems.length; i < max; i +=1) {
					if (underElems.get(i).checked === true) {
						json[elem.attr('name')] += $(underElems.get(i)).attr('name') + ',';
					}
				}
				json[elem.attr('name')] = json[elem.attr('name')].replace(/\,$/, ';');
				if (json[elem.attr('name')] === '') {
					self.addErrorMsq(elem, 'Please check parameters!');
					error = 'error';
				}
			} else if (elem.hasClass('optionlist')) {
				underElems = elem.find('option');
				json[elem.attr('name')] = '';
				for (i = 0, max = underElems.length; i < max; i += 1) {
					if (underElems.get(i).selected === true) {
						json[elem.attr('name')] += underElems.get(i).value + ',';
					}
				}
				json[elem.attr('name')] = json[elem.attr('name')].replace(/\,$/, ';');
				if (json[elem.attr('name')] === '') {
					self.addErrorMsq(elem, 'Please select parameters!');
					error = 'error';
				}
			} else {
				if (elem.attr('type') === 'radio') {
					checkerCount += 1;
					if (elem.attr('checked') === 'checked') {
						if (elem.hasClass('booltrue')) {
							json[elem.attr('name')] = 'true';
						} else if (elem.hasClass('boolfalse')){
							json[elem.attr('name')] = 'false';
						}
					}
					if ((checkerCount === 2) && (json[elem.attr('name')] === undefined)) {
						self.addErrorMsq(elem, 'Please select parameter!');
						error = 'error';
					}
				} else {
					if (elem.hasClass('input')) {
						json[elem.attr('name')] = elem.val();
					}
					if (json[elem.attr('name')] === '') {
						self.addErrorMsq(elem, 'Please input parameter!');
						error = 'error';
					}
				}
			}
		});
		if (error === 'error') {
			self.addErrorMsq($('.send_button'), 'Please input all parameters!');
			return false;
		} else {
			return json;
		}
	},
	/**
	addEventToSetRow for dinamicly clicked rows in table of jobs.
	*@method addEventToSetRow
	*@param {DOM Object} table For our iteration searching for row to add eventListener.
	*/
	/*addEventToSetRow: function (table) {
		"use strict";
		var rows = table.find('tr'),
			self = this,
			cells;
		rows.each(function (i, row) {
			row = $(row);
			cells = row.find('td');
			cells.each(function (j, cell) {
				cell = $(cell);
				if (cell.text() === 'set') {
					row.addClass('set');
					table.delegate('.set', 'click',  row.attr('id'), Events.tableJobSet);
				}
			});
		});
	},*/
	addHoverEvent: function (node) {
		"use strict";
		node.on('mouseover', function (e) {
			node.addClass('row_selected');
			node.find('div[id^=clickers_]').show();
		});
		node.on('mouseout', function (e) {
			node.removeClass('row_selected');
			node.find('div[id^=clickers_]').hide();
		});
	},
	/**buildTable for building a jobs table.
	*@method buildTable
	*@param {Object} jobsObject Object with all information about jobs from server, which we add to the table.
	*@param {undefined|DOM Object} container Optional argument for adding table right to it? or only generating a table without search and navigation keys.
	*@returns {DOM Object} table for inheritance using.
	*/
	buildTable: function (jobsObject, container) {
		"use strict";
		var table = $('<table id="table"></table>'),
			self = this,
			tr = $('<tr></tr>'),
			columnsConfig = [
				{ 'mData': 'name' },
				{ 'mData': 'type' },
				{ 'mData': 'status' }
			],
			key;
		tr.append($('<th>Name</th><th>Type</th><th>Status</th>'));
		for (key in jobsObject[0].parameters) {
			tr.append($('<th>' + key + '</th>'));
			columnsConfig.push({ 'mData': 'parameters.' + key });
		}
		columnsConfig.push({'mData': null});
		columnsConfig.push({'mData': null});
		tr.append($('<th><input type="checkbox" id="check_all"></th><th></th>'));
		table.append($('<thead></thead>').append(tr)).append($('<tbody></tbody>'));
		container.append(table);
		table = container.find(table).dataTable({
			"bProcessing": true,
			"sPaginationType": "full_numbers",
			"sDom": '<"top">rt<"bottom"p><"clear">',
			"bAutoWidth": false,
			"aaData": jobsObject,
			"aoColumns": columnsConfig,
			"fnRowCallback": function (row, data) {
				row = $(row);
				row.attr({id: data.id});
				/*row.tooltip({
					position: "center right",
					predelay: 600,
					effect: 'fade',
					opacity: 0.8
				});*/
				self.addHoverEvent(row);
				return row;
			},
			"aoColumnDefs": [
				{
					"fnRender" : function (oObj) {
						return '<input type="checkbox" value="row_id' + oObj.aData.id + '" class = "row_checkers">';
					},
					"bSortable": false,
					"aTargets": [columnsConfig.length - 2]
				},
				{
					"fnRender" : function (oObj) {
						return '<div id="clickers_' + oObj.aData.id + '"><a href="#" class="row_do row_delete"></a><a href="#" class="row_do row_stop"></a><a href="#" class="row_do row_start"></a></div>';
					},
					"bSortable": false,
					"sWidth": "80px",
					"aTargets": [columnsConfig.length - 1]
				}
			],
			"fnDrawCallback": function (arg) {
				$('div[id^="clickers_"]').hide();
				//self.addEventToSetRow(table);
			}
		});
		return table;
	},
	/**
	*prepareForTree is function which prebuild the tree of jobsets and workflows.
	*@method prepareForTree
	*@param {Object} jobsObject Config object from server with lighter interface compare with jobsObject in Build.buildTable function.
	*@returns {Object} treeObject Prebuild config object for jstree.
	*/
	prepareForTree: function (jobsObject) {
		"use strict";
		var treeObject = [],
			treeElement = {},
			self = this;
		$.each(jobsObject, function (index, value) {
			treeElement = {};
			treeElement.data = {};
			if (value.type === 'set') {
				treeElement.data.title = value.name;
				treeElement.data.attr = {id: value.id, 'class': 'jobset'};
				treeElement.data.icon = 'images/folder.png';
				if (value.subjobs !== undefined) {
					treeElement.children = self.prepareForTree(value.subjobs);//recursive calling in mean that jobsets can contain jobsets and workflows
				}
				treeObject.push(treeElement);
			} else if (value.type === 'workflow') {
				treeElement.data.title = value.name;
				treeElement.data.attr = {id: value.id, 'class': 'workflow'};
				treeElement.data.icon = 'images/alg.png';
				treeObject.push(treeElement);
			}
		});
		return treeObject;
	},
	/**
	*buildTree calls when we need to build a tree of jobsets and workflow.
	*@method buildTree
	*@param {Object} liteJobsObject Light information from the server only about workflow and jobsets.
	*@param {DOM Object} container For initialization treeview in document.
	*@returns {DOM Object} container
	*/
	buildTree: function (liteJobsObject, container) {
		"use strict";
		var treeObject = this.prepareForTree(liteJobsObject);
		container.jstree({
			json_data: {
				data: treeObject,
				progressive_render: true
			},
			ui: {
				select_limit: 2
			},
			plugins: ['themes', 'json_data', 'ui'],
			themes: {
				theme: 'apple',
				url: 'css/jquery.tree.css'
			}
		});
		return container;
	}
};
