	function Builder (config) {
		// use config object
	}
	Builder.prototype = {
	 	firstLetter: function(word){
			return word.substr(0,1).toUpperCase() + word.substr(1);
		},
		buildForm: function(projectСonfig, container){
			if(!container){
				var fragment = $('<form id ="new_project" name="data" method="post"></form>'),
					tabsMenu = $('<div id="tabs"></div>'),
					count = 1,
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
					console.log(tabsMenu);
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
				else if(projectСonfig[prop].type === 'list.check')	{
					element =  $('<fieldset></fieldset>');
					element.append($('<legend>'+this.firstLetter(prop.toString())+'</legend>'));
					var i = 0;
					while(projectСonfig[prop][i]!==undefined){
						element.append($('<p><input type="checkbox" name="'+projectСonfig[prop][i]+'" class="list.checks">'+projectСonfig[prop][i]+'</p>'));
						i+=1;
					}
					self.append(element);
				}
				else if(projectСonfig[prop].type === 'list.option')	{
					element =  $('<select></select>');
					var i = 0;
					while(projectСonfig[prop][i]!==undefined){
						element.append($('<option value="'+projectСonfig[prop][i]+'" class="list.option">'+projectСonfig[prop][i]+'</option>'));
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
		getJSON: function(formObject){//доработать надо все четко продумать
			var json = {};
			$.each(formObject.get(0).elements, function(key,elem){
				json[elem.name] = elem.value;
			});
			return JSON.stringify(json);
		},
		addEventToSetRow: function(table){
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
		buildTable: function(jobsObject){
			var table = $('<table id="table"></table>'),
				tr = $('<tr></tr>'),
				columnsConfig = [
					{ 'mData': 'name' },
					{ 'mData': 'type' },
					{ 'mData': 'status' }
				];
			tr.append($('<th>Name</th><th>Type</th><th>Status</th>'));
			for(var key in jobsObject[0].parameters){
				tr.append($('<th>'+key+'</th>'));
				columnsConfig.push({ 'mData': 'parameters.'+key });
			}
			table.append($('<thead></thead>').append(tr)).append($('<tbody></tbody>'));
			table.dataTable( {
				"bProcessing": true,
				"aaData": jobsObject,
				"aoColumns": columnsConfig,
				"fnRowCallback": function(row, data){
					$(row).attr('id', data.id);
					return row;
				}
			} );
			this.addEventToSetRow(table);
		return table;
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
		    'RIGHT': 39,
		    //'INSERT': 45,
		    //'DELETE': 46
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
		$('.modalCloseImg').trigger('click');
		var b = new Builder(),
		data = (new Connection()).send();
		console.log(b.getJSON($('#new_project')));

	})
})