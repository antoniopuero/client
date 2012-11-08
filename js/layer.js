/**@constructor*/
function Connection(config){

}
Connection.prototype = {
	/**
	*Function send is using for send response to the server and get the starting information.
	*@method send
	*/
	send: function(){
		//do something
		var data = this.getNewJob();
		//do something with data
		return data;
	},
	/**
	*isLocalStorageAvailable checks the localStorage in client browser.
	*@method isLocalStorageAvailable
	*@returns {Boolean} available.
	*/
	isLocalStorageAvailable: function() {
	    try {
	        return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	        return false;
	    }
	},
	/**
	*getNewJob get information from server for building jobs table by Builder.buildTable.
	*@method getNewJob
	*@returns {Object} configDataObject.
	*/
	getNewJob: function(){
	return {
			tab1:{
				tabName: 'digits',
				b: 'float',	
				a: 'int'
			},
			tab2: {
				tabName: 'other',
				c: 'bool',
				d: 'blob'
			},
			tab3:{
				tabName: 'lists',
				e: {
					type: 'list_check',
					0: 'el1',
					1: 'el2',
					2: 'el3'
				},
				f: {
					type: 'list_option',
					0: 'el1',
					1: 'el2',
					2: 'el3'
				}
		}
		};
	},
	/**
	*getJobs gets jobs list and all information about them.
	*@method getJobs
	*@param {undefined|number|string} id for using secondary building of jobsets and other.
	*@returns {Object} jobs.
	*/
	getJobs: function(id){

		var jobs = [
			{	id: 1,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 2,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 3,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 4,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 5,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 6,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 7,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 8,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 9,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 10,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 11,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 12,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 13,
				name: 'job3',
				type: 1,
				parameters:{
					key1: 15,
					key2: 28.25,
					key3: 'sonestr'
				},
				status: 'in process'
			},
			{
				id: 14,
				name: 'job2',
				type: 'set',
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				subjobs: [
					{
						name: 'job14.1',
						type: 1,
						parameters:{
							key1: 'value1',
							key2: 'value2',
							key3: 'value3'
						},
					status: 'done'
					},
					{
						name: 'job14.2',
						type: 1,
						parameters:{
							key1: 'value1',
							key2: 'value2',
							key3: 'value3'
						},
					status: 'in process'
					}
				],
				status: 'done'
			},
			{	id: 15,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 17,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 18,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
			{	id: 19,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				status: 'in process'
			},
		];
		for (var i = 0; i< 200; i += 1) {
			jobs.push({	id: i + 49,
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value' + (i + 49),
					key2: 'value2' + (i + 49),
					key3: 'value3' + (i + 49)
				},
				status: 'in process'
			});
		}
		if (!window.JSON) {
			window.JSON = {
				parse: function (sJSON) { return eval("(" + sJSON + ")"); },
				stringify: function (vContent) {
					if (vContent instanceof Object) {
						var sOutput = "";
						if (vContent.constructor === Array) {
							for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
							return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
						}
						if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
							for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ",";
						}
							return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
					}
					return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
				}
			};
		 }
		// if(id !== undefined){
			
		// }
		var jsonStr = JSON.stringify(jobs);
		if(this.isLocalStorageAvailable()){
			localStorage.setItem('jobs', jsonStr);
			this.getJobs = function(){
				return JSON.parse(localStorage.getItem('jobs'));
			}
			return jobs;
		}
		return jobs;
	},
	/**
	*getJobsTree gets the lightest version of jobs lists with complex information for building a tree by the Buider.buildTree.
	*@method getJobsTree
	*@returns {Object} liteJobs.
	*/
	getJobsTree: function(){
	var liteJobs = [
		{	
			id: 13,
			name: 'jobset',
			type: 'set',
			subjobs: [
				{
					id: 13.1,
					name: 'jobset',
					type: 'set'
				},
				{
					id: 13.2,
					name: 'jobset',
					type: 'set'
				},
				{
					id: 13.3,
					name: 'jobset',
					type: 'set'
				}
			]
		},
		{
			id: 14,
			name: 'workflow',
			type: 'workflow'
		}
	];
	return liteJobs;
	}
}
