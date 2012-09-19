	function Builder (config) {
		this.inputSize=(config)?config.inputSize:40;
		this.textCols = (config)?config.textCols:30;
		this.textRows = (config)?config.textRows:50;

	}
	Builder.prototype = {
	 	firstLetter: function(word){
			return word.substr(0,1).toUpperCase() + word.substr(1);
		},
		buildForm: function(projectСonfig){
			var fragment = $('<form id ="new_project" name="data" method="post"></form>'),
			element;

			for(var prop in projectСonfig){
				if(projectСonfig[prop] === 'int'){
					element =  $('<p>'+this.firstLetter(prop.toString())+'</p><input type="text" name="'+prop+'" class="int" size="40">');
					fragment.append(element); 
				}
				else if(projectСonfig[prop] === 'float')	{
					element =  $('<p>'+this.firstLetter(prop.toString())+'</p><input type="text" name="'+prop+'" class="float" size="40">');
					fragment.append(element);
				}
				else if(projectСonfig[prop] === 'string')	{
					element =  $('<p>'+this.firstLetter(prop.toString())+'</p><input type="text" name="'+prop+'" class="string" size="40">');
					fragment.append(element);
				}
				else if(projectСonfig[prop] === 'bool')	{
					element =  $('<p>'+this.firstLetter(prop.toString())+'</p><span>True:</span><input type="radio" name="'+prop+'" class="bool.true"><span>False:</span><input type="radio" name="'+prop+'" class="bool.false">');
					fragment.append(element);
				}
				else if(projectСonfig[prop] === 'blob')	{
					element =  $('<p>'+this.firstLetter(prop.toString())+'</p><textarea name="'+prop+'" class="blob" cols="30" rows="15">');
					fragment.append(element);
				}
				else if(projectСonfig[prop].type === 'list.check')	{
					element =  $('<fieldset></fieldset>');
					element.append($('<legend>'+this.firstLetter(prop.toString())+'</legend>'));
					var i = 0;
					while(projectСonfig[prop][i]!==undefined){
						element.append($('<p><input type="checkbox" name="'+projectСonfig[prop][i]+'" class="list.checks">'+projectСonfig[prop][i]+'</p>'));
						i+=1;
					}
					fragment.append(element);
				}
				else if(projectСonfig[prop].type === 'list.option')	{
					element =  $('<select></select>');
					var i = 0;
					while(projectСonfig[prop][i]!==undefined){
						element.append($('<option value="'+projectСonfig[prop][i]+'" class="list.option">'+projectСonfig[prop][i]+'</option>'));
						i+=1;
					}
					fragment.append('<p>'+this.firstLetter(prop.toString())+'</p>').append(element);
				}
			}
			fragment.append($('<button id="send">Send</button>'));
			return fragment;
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
						table.delegate('.set', 'click', self.handlers.tableJobSet);
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
				'aaData': jobsObject,
				"aoColumns": columnsConfig
			} );
			this.addEventToSetRow(table);
		return table;
		},
		handlers:{
			tableJobSet: function(e){
				var jsonData = (new Connection()).getJobs();
				e.preventDefault();
				$('#container').append((new Builder()).buildTable(jsonData));
			}
		}
	}


/*-------------------------------Handlers--------------------------------*/
$(document).ready(function(){	
	$('#form_container').delegate('.int','keyup', function(e){
		if((47>e.which)||(e.which>57)){
			e.target.value = e.target.value.replace(/[^\-\d]+/g,'');
		}
	})
	$('#form_container').delegate('.float','keyup', function(e){
		if((47>e.which)||(e.which>57)){
			e.target.value = e.target.value.replace(/[^\-\d\.]+/g,'');
		}
	})
	$('#form_container').delegate('#send','click', function(e){
		e.preventDefault();
		var b = new Builder(),
		data = (new Connection()).send();
		$(this).append(b.buildForm(data));
		console.log(b.getJSON($('#new_project')));

	})
})