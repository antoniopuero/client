/**
*@constructor
*/
var Builder = function (config) {
	"use strict";
	var formId = config.formId,
		tableId = config.tableId,
		treeId = config.treeId,
		firstLetter = function (word) {
			return word.substr(0, 1).toUpperCase() + word.substr(1);
		},
		buildActionMenu = function (node) {
			node.prepend($('<a href="#" class="row_do row_delete"><i class="icon-remove"></i></a><a href="#" class="row_do row_stop"><i class="icon-stop"></i></a><a href="#" class="row_do row_start"><i class="icon-play"></i></a>'));
		},
		destroyActionMenu = function (node) {
			node.find('a').detach();
		},
		/**
		*buildForm a simple form, which helps user to init new job.
		*@method buildForm
		*@param {Object} config all data with types from server, which user need to init new job.
		*@param {undefined|DOM Object} container Optional argument for recursive calling of builForm for different types and tabs of data.
		*@returns {DOM Object} form Builded form
		*/
		addKeyException = function(element, type) {
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
				keyName;
			if (type === 'int') {
				element.on('keypress', function (e) {
					keyFlag = true;
					ctrlKey = true;
					for (keyName in keyNames) {
						if ((keyNames.hasOwnProperty(keyName)) && (e.keyCode === keyNames[keyName])) {//for Firefox!!!
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
			} else if (type === 'float') {
				element.on('keypress', function (e) {
					keyFlag = true;
					ctrlKey = true;
					for (keyName in keyNames) {
						if (keyNames.hasOwnProperty(keyName) && (e.keyCode === keyNames[keyName])) { // for Firefox!
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
					if ((ctrlKey && keyFlag && ((e.which < 46) || (e.which > 57) || (e.which === 47)))
							|| (($(this).val().match(/\./)) && (e.which === 46))) {
						return false;
					}
				});
			}
		},
		buildForm = function (config, container) {
			var digits = container.find('div[id$=digits]'),
				other = container.find('div[id$=other]'),
				lists = container.find('div[id$=lists]'),
				i = 0,
				element,
				prop;
			addProfilesToForm(container, config.profiles);
			for (prop in config) {
				if (config.hasOwnProperty(prop)) {
					if (typeof config[prop] === 'string') {
						switch (config[prop]) {
						case 'int':
						case 'float':
							element =  $('<div class="input-prepend control-group"><span class="add-on">' + firstLetter(prop.toString()) + '</span><input type="text" name="' + prop + '" class="span2 input" placeholder="Only ' + config[prop] +  ' value"></div>');
							addKeyException(element, config[prop]);
							digits.append(element);
							break;
						case 'string':
							element =  $('<div class="input-prepend control-group"><span class="add-on">' + firstLetter(prop.toString()) + '</span><input type="text" name="' + prop + '" class="span2 input"></div>');
							other.append(element);
							break;
						case 'bool':
							element =  $('<div class="control-group"><p>' + firstLetter(prop.toString()) + '</p><label class="radio">true<input type="radio" name="' + prop + '" class="booltrue"></label><label class="radio">false<input type="radio" name="' + prop + '" class="boolfalse"></label></div>');
							other.append(element);
							break;
						case 'blob':
							element =  $('<div class="control-group"><p>' + firstLetter(prop.toString()) + '</p><textarea name="' + prop + '" class="blob input" rows="5"></textarea></div>');
							other.append(element);
							break;
						}
					} else {
						switch (config[prop].type) {
						case 'list_check':
							element =  $('<fieldset class="checklist" name="' + prop + '"></fieldset>');
							element.append($('<legend>' + firstLetter(prop.toString()) + '</legend>'));
							i = 0;
							while (config[prop][i] !== undefined) {
								element.append($('<label class="checkbox"><input type="checkbox" name="' + config[prop][i] + '" class="list_checks">' + config[prop][i] + '</label>'));
								i += 1;
							}
							lists.append(element);
							break;
						case 'list_option':
							element =  $('<select class="optionlist" multiple="multiple" name="' + prop + '"></select>');
							i = 0;
							while (config[prop][i] !== undefined) {
								element.append($('<option value="' + config[prop][i] + '" class="list_option">' + config[prop][i] + '</option>'));
								i += 1;
							}
							lists.append('<p>' + firstLetter(prop.toString()) + '</p><span class ="help-block">Use ctrl key to multiple select</span>').append(element);
							break;
						}
					}
				}
			}
		},
		addErrorMsq = function (elem, msg) {
			elem.parent().addClass('error');
			elem.after($('<span class="help-inline">' + msg + '</span>'));
		},
		delErrorMsg = function (form) {
			form.find('.error').removeClass('error');
		},
		resetForm = function (formObject) {
			formObject = $(formObject);
			formObject.find(':checkbox').attr('checked', false);
			formObject.find(':radio').attr('checked', false);
			formObject.find('option[class!="prf"]').attr('selected', false);
			formObject.find('input').val('');
			formObject.find('textarea').val('');
		},
		useProfile = function (formObject, profile) {
			var val,
				inputEl,
				textEl,
				selectEl,
				fieldEl,
				i;
			resetForm(formObject);
			formObject = $(formObject);
			for (val in profile) {
				if (!$.isArray(profile[val])) {
					if (profile[val] === true) {
						formObject.find('.booltrue[name="' + val + '"]').attr('checked', true);
					} else if (profile[val] === false) {
						formObject.find('.boolfalse[name="' + val + '"]').attr('checked', true);
					} else {
						inputEl = formObject.find('input[name="' + val + '"]');
						textEl = formObject.find('textarea[name="' + val + '"]');
						if ((inputEl.get(0) !== undefined) && (inputEl.attr('type') === 'text')) {
							inputEl.val(profile[val]);
						} else if (textEl.get(0) !== undefined) {
							textEl.val(profile[val]);
						}
					}
				} else {
					selectEl = formObject.find('select[name="' + val + '"]');
					fieldEl = formObject.find('fieldset[name="' + val + '"]');
					if (selectEl.get(0) !== undefined) {
						for (i = 0; i < profile[val].length; i += 1) {
							selectEl.find('option[value="' + profile[val][i] + '"]').attr('selected', true);
						}
					} else if (fieldEl.get(0) !== undefined) {
						for (i = 0; i < profile[val].length; i += 1) {
							fieldEl.find('input[name="' + profile[val][i] + '"]').attr('checked', true);
						}
					}
				}
			}
		},
		changeProfile = function (e) {
			var targetName = e.target.value;
			if (targetName === '<user>') {
				resetForm(e.target.form);
			} else {
				useProfile(e.target.form, e.data.profiles[targetName]);
			}
		},
		addProfilesToForm = function (container, profiles) {
			var profile,
				selectObject = container.find('select[name="profiles"]');
			selectObject.on('change', {profiles: profiles}, changeProfile);
			for (profile in profiles) {
				selectObject.append($('<option name="' + profile + '" class="prf">' + profile + '</option>'));
			}
		},
		/**
		*getJSON for right conversion of form data to JSON format.
		*@method getJSON
		*@param {DOM Object} formObject DOM fragment with form with inputed data.
		*@returns {JSON string} json which we send back to the server.
		*/
		getJSON = function (formObject) {
			var json = {},
				underElems,
				error,
				checkerCount = 0,
				i = 0,
				max = 0;
			delErrorMsg(formObject);
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
						addErrorMsq(elem, 'Mandatory field!');
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
						addErrorMsq(elem, 'Mandatory information');
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
							addErrorMsq(elem, 'Mandatory information');
							error = 'error';
						}
					} else {
						if (elem.hasClass('input')) {
							json[elem.attr('name')] = elem.val();
						}
						if (json[elem.attr('name')] === '') {
							addErrorMsq(elem, 'Mandatory field!');
							error = 'error';
						}
					}
				}
			});
			if (error === 'error') {
				return false;
			} else {
				return json;
			}
		},
		addHoverEvent = function (node) {
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
		buildTable = function (jobsObject, container) {
			var table = $('<table id="table"></table>'),
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
			tr.append($('<th><input type="checkbox" id="check_all"></th><th id="action_buttons"></th>'));
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
					addHoverEvent(row);
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
							return '<div id="clickers_' + oObj.aData.id + '"><a href="#" class="row_do row_delete"><i class="icon-remove"></i></a><a href="#" class="row_do row_stop"><i class="icon-stop"></i></a><a href="#" class="row_do row_start"><i class="icon-play"></i></a></div>';
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
		prepareForTree = function (jobsObject) {
			var treeObject = [],
				treeElement = {};
			$.each(jobsObject, function (index, value) {
				treeElement = {};
				treeElement.data = {};
				if (value.type === 'set') {
					treeElement.data.title = value.name;
					treeElement.data.attr = {id: value.id, 'class': 'jobset'};
					treeElement.data.icon = 'images/folder_open.png';
					if (value.subjobs !== undefined) {
						treeElement.children = prepareForTree(value.subjobs);//recursive calling in mean that jobsets can contain jobsets and workflows
					}
					treeObject.push(treeElement);
				} else if (value.type === 'workflow') {
					treeElement.data.title = value.name;
					treeElement.data.attr = {id: value.id, 'class': 'workflow'};
					treeElement.data.icon = 'images/charts.png';
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
		buildTree =  function (liteJobsObject, container) {
			var treeObject = prepareForTree(liteJobsObject);
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
		};
	return {
		/*methods*/
		buildForm: buildForm,
		getJSON: getJSON,
		buildTable: buildTable,
		buildTree: buildTree,
		destroyActionMenu: destroyActionMenu,
		buildyActionMenu: buildActionMenu,
		/*constants*/
		formId: formId,
		tableId: tableId,
		treeId: treeId
	};
};
