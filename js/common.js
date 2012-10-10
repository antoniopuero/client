/**
*@constructor
*/
function Builder (config) {
	this.formC = config.formC;
	this.tableC = config.tableC;
	this.treeC = config.treeC;
}
Builder.prototype = {
 	firstLetter: function(word){
		//"use strict";
		return word.substr(0,1).toUpperCase() + word.substr(1);
	},
	/**
	*buildForm a simple form, which helps user to init new job.
	*@method buildForm
	*@param {Object} projectConfig all data with types from server, which user need to init new job.
	*@param {undefined|DOM Object} container Optional argument for recursive calling of builForm for different types and tabs of data.
	*@returns {DOM Object} form Builded form 
	*/
	buildForm: function(projectСonfig, container){
		//"use strict";
		if(!container){
			var fragment = $('<form id ="new_project" name="data" method="post"></form>'),
				tabsMenu = $('<div id="tabs"></div>'),
				count = 1
				i = 0,
				element,
				self = fragment;
		} else {
			self = container;
		}
		for(var prop in projectСonfig){
			if((typeof projectСonfig[prop] === 'object')&&(projectСonfig[prop]['tabName'])){
				if(count === 1){
					tabsMenu.append($('<ul class = "tabs"></ul><div class="panes"></div>'));
				}
				tabsMenu.find('.tabs').append($('<li><a href="#tabs-'+count+'">'+projectСonfig[prop]['tabName']+'</a></li>'));
				tabsMenu.find('.panes').append($('<div id = "tabs-'+count+'"></div>'));
				this.buildForm(projectСonfig[prop], tabsMenu.find('#tabs-'+count));
				count+=1;
				self.append(tabsMenu);
			}
			else if((projectСonfig[prop] === 'int')||(projectСonfig[prop] === 'float')||(projectСonfig[prop] === 'string')){
				element =  $('<p>'+this.firstLetter(prop.toString())+'</p><input type="text" name="'+prop+'" class="'+projectСonfig[prop]+'" size="40">');
				self.append(element); 
			}
			else if(projectСonfig[prop] === 'bool')	{
				element =  $('<p>'+this.firstLetter(prop.toString())+'</p><span>True:</span><input type="radio" name="'+prop+'" class="bool.true"><span>False:</span><input type="radio" name="'+prop+'" class="bool.false">');
				self.append(element);
			}
			else if(projectСonfig[prop] === 'blob')	{
				element =  $('<p>'+this.firstLetter(prop.toString())+'</p><textarea name="'+prop+'" class="blob" cols="30" rows="15">');
				self.append(element);
			}
			else if(projectСonfig[prop].type === 'list_check')	{
				element =  $('<fieldset></fieldset>');
				element.append($('<legend>'+this.firstLetter(prop.toString())+'</legend>'));
				i = 0;
				while(projectСonfig[prop][i]!==undefined){
					element.append($('<p><input type="checkbox" name="'+projectСonfig[prop][i]+'" class="list_checks">'+projectСonfig[prop][i]+'</p>'));
					i+=1;
				}
				self.append(element);
			}
			else if(projectСonfig[prop].type === 'list_option')	{
				element =  $('<select></select>');
				i = 0;
				while(projectСonfig[prop][i]!==undefined){
					element.append($('<option value="'+projectСonfig[prop][i]+'" class="list_option">'+projectСonfig[prop][i]+'</option>'));
					i+=1;
				}
				self.append('<p>'+this.firstLetter(prop.toString())+'</p>').append(element);
			}
		}

		self.find('ul.tabs').tabs('div.panes > div');
		if(!container){
			self.append($('<button id="send">Send</button>'));
			return self;
		}
	},
	/**
	*getJSON for right conversion of form data to JSON format.
	*@method getJSON
	*@param {DOM Object} formObject DOM fragment with form with inputed data.
	*@returns {JSON string} json which we send back to the server.
	*/
	getJSON: function(formObject){
		//"use strict";
		var json = {};
		$.each(formObject.get(0).elements, function(key,elem){
			elem=$(elem);
			if(elem.attr('type') === 'checkbox'){
			}
			else if((elem.attr('type') === 'radio')&&(elem.attr('checked') === 'checked')){
				if(elem.hasClass('bool.true')){
						json[elem.attr('name')] = true;
					} else {
						json[elem.attr('name')] = false;
					}
				}
				else{
				json[elem.attr('name')] = elem.val();
				}
			});
		return JSON.stringify(json);
	},
	/**
	addEventToSetRow for dinamicly clicked rows in table of jobs.
	*@method addEventToSetRow
	*@param {DOM Object} table For our iteration searching for row to add eventListener.
	*/
	addEventToSetRow: function(table){
		//"use strict";
		var rows = $('tr', table),
			self = this,
			cells;
		rows.each(function(i, row){
			row = $(row);
			cells = row.find('td');
			cells.each(function(j, cell){
				cell = $(cell);
				if (cell.text() === 'set'){
					row.addClass('set');
					table.delegate('.set', 'click',  row.attr('id'), Events.tableJobSet);
				}
			})
		})
	},
	/**buildTable for building a jobs table.
	*@method buildTable
	*@param {Object} jobsObject Object with all information about jobs from server, which we add to the table.
	*@param {undefined|DOM Object} container Optional argument for adding table right to it? or only generating a table without search and navigation keys.
	*@returns {DOM Object} table for inheritance using.
	*/
	buildTable: function(jobsObject, container){
		//"use strict";
		var table,
			self = this,
			tr = $('<tr></tr>'),
			columnsConfig = [
				{ 'mData': 'name' },
				{ 'mData': 'type' },
				{ 'mData': 'status' }
			];
		if(container!==undefined){
			table = $('<table id="table"></table>');
		} else {
			table = $('<table id="new_one"></table>');
		}
		tr.append($('<th>Name</th><th>Type</th><th>Status</th>'));
		for(var key in jobsObject[0].parameters){
			tr.append($('<th>'+key+'</th>'));
			columnsConfig.push({ 'mData': 'parameters.'+key });
		}
		table.append($('<thead></thead>').append(tr)).append($('<tbody></tbody>'));
		if(container!==undefined){
			container.append(table);
			table = container.find(table);
		}
		table.dataTable( {
			"bProcessing": true,
			"aaData": jobsObject,
			"aoColumns": columnsConfig, 
			"fnRowCallback": function(row, data){
				$(row).attr('id', data.id);
				return row;
			},
			"fnDrawCallback": function(){
				self.addEventToSetRow(table);
			}
		} );
		return table;
	},
	/**
	*prepareForTree is function which prebuild the tree of jobsets and workflows.
	*@method prepareForTree
	*@param {Object} jobsObject Config object from server with lighter interface compare with jobsObject in Build.buildTable function.
	*@returns {Object} treeObject Prebuild config object for jstree.
	*/ 
	prepareForTree: function(jobsObject){
		var treeObject = [],
		treeElement = {};
		for (var i = 0, max = jobsObject.length; i < max; i+=1){
			treeElement = {};
			treeElement.data = {};
			if(jobsObject[i].type === 'set'){
				treeElement.data['title'] = jobsObject[i].name;
				treeElement.data['attr'] = {id:jobsObject[i].id};
				treeElement.data['icon'] = 'folder';
				if(jobsObject[i].subjobs !== undefined){
					treeElement.children = [];
					for(var j = 0, childMax = jobsObject[i].subjobs.length; j<childMax; j++){
						treeElement.children.push({
							data: {
								title: jobsObject[i].subjobs[j].name,
									icon: 'images/job.gif'
							}
						});
					}
				}
				treeObject.push(treeElement);
			}
			else if(jobsObject[i].type === 'workflow'){
				treeElement.data['title'] = jobsObject[i].name;
				treeElement.data['attr'] = {id:jobsObject[i].id};
				treeElement.data['icon'] = 'images/alg.png';
				treeObject.push(treeElement);
			}
		}
		return treeObject;
	},
	/**
	*buildTree calls when we need to build a tree of jobsets and workflow.
	*@method buildTree
	*@param {Object} liteJobsObject Light information from the server only about workflow and jobsets.
	*@param {DOM Object} container For initialization treeview in document.
	*@returns {DOM Object} container
	*/
	buildTree: function(liteJobsObject, container){
		var treeObject = this.prepareForTree(liteJobsObject);
		container.jstree({
			json_data: {
				data: treeObject,	
				progressive_render: true,
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
}
