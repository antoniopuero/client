function Connection(config){

}
Connection.prototype = {
	send: function(){
		//do something
		var data = this.getNewJob();
		//do something with data
		return data;
	},
	isLocalStorageAvailable: function() {
	    try {
	        return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	        return false;
	    }
	},
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
				id: 3,
				name: 'job2',
				type: 'set',
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3'
				},
				subjobs: [
					{
						name: 'job2.1',
						type: 1,
						parameters:{
							key1: 'value1',
							key2: 'value2',
							key3: 'value3'
						},
					status: 'done'
					},
					{
						name: 'job2.2',
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
			}
		];
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
	getJobsTree: function(){
	var liteJobs = [
		{	
			id: 2,
			name: 'jobset',
			type: 'set',
			subjobs: [
				{
					name: 'subjob1',
					type: 1
				},
				{
					name: 'subjob2',
					type: 1
				},
				{
					name: 'subjob3',
					type: 1
				}
			]
		},
		{
			id: 3,
			name: 'workflow',
			type: 'workflow',
			subjobs: [
				{
					name: 'subjob1',
					type: 1
				},
				{
					name: 'subjob2',
					type: 1
				},
				{
					name: 'subjob3',
					type: 1
				}
			]
		}
	];
	return liteJobs;
	}
}
